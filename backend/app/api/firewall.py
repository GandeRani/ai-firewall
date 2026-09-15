from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.detector import detect_threats
from app.risk_engine import calculate_risk, determine_action
from app.masking import mask_prompt


router = APIRouter(
    prefix="",
    tags=["Firewall"]
)


# ============================================================
# REQUEST MODEL
# ============================================================

class FirewallRequest(BaseModel):
    prompt: str = Field(
        ...,
        min_length=1,
        max_length=10000,
        description="Prompt to scan"
    )


# ============================================================
# IN-MEMORY SECURITY LOG
# ============================================================

security_logs = []


# ============================================================
# FIREWALL CHECK
# ============================================================

@router.post("/check")
def check_prompt(request: FirewallRequest):

    prompt = request.prompt.strip()

    if not prompt:
        raise HTTPException(
            status_code=400,
            detail="Prompt cannot be empty"
        )

    # --------------------------------------------------------
    # 1. Detect threats
    # --------------------------------------------------------

    detected = detect_threats(prompt)

    # --------------------------------------------------------
    # 2. Calculate risk
    # --------------------------------------------------------

    risk_score = calculate_risk(detected)

    # --------------------------------------------------------
    # 3. Decide firewall action
    # --------------------------------------------------------

    action = determine_action(
        risk_score,
        detected
    )

    # --------------------------------------------------------
    # 4. Secure prompt
    # --------------------------------------------------------

    if action == "BLOCK":
        secured_prompt = None

    elif action == "MASK":
        secured_prompt = mask_prompt(prompt)

    else:
        secured_prompt = prompt

    # --------------------------------------------------------
    # 5. Create security log
    # --------------------------------------------------------

    log_entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "prompt": prompt,
        "detected": detected,
        "risk_score": risk_score,
        "action": action,
        "secured_prompt": secured_prompt,
    }

    security_logs.append(log_entry)

    # Keep only latest 500 logs
    if len(security_logs) > 500:
        security_logs.pop(0)

    # --------------------------------------------------------
    # 6. Return firewall result
    # --------------------------------------------------------

    return {
        "risk_score": risk_score,
        "detected": detected,
        "action": action,
        "secured_prompt": secured_prompt,
    }


# ============================================================
# SECURITY LOGS
# ============================================================

@router.get("/logs")
def get_logs():

    # Newest logs first
    return list(reversed(security_logs))