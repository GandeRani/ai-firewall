# ============================================================
# AI FIREWALL - RISK ENGINE
# ============================================================


# ============================================================
# RISK WEIGHTS
# ============================================================

RISK_WEIGHTS = {

    # -------------------------------
    # PII
    # -------------------------------

    "EMAIL": 40,
    "PHONE": 40,
    "CREDIT_CARD": 60,
    "AADHAAR": 60,
    "PAN": 50,


    # -------------------------------
    # SECRET LEAKS
    # -------------------------------

    "AWS_KEY": 80,
    "API_KEY": 80,
    "PASSWORD": 70,


    # -------------------------------
    # AI SECURITY THREATS
    # -------------------------------

    "PROMPT_INJECTION": 80,
    "JAILBREAK": 90,
}



# ============================================================
# CALCULATE RISK SCORE
# ============================================================

def calculate_risk(detected: list[str]) -> int:
    """
    Calculate total firewall risk score.

    Maximum score = 100
    """

    score = 0

    for threat in detected:
        score += RISK_WEIGHTS.get(threat, 0)

    return min(score, 100)



# ============================================================
# FIREWALL ACTION DECISION
# ============================================================

def determine_action(
    score: int,
    detected: list[str] | None = None
) -> str:
    """
    Decide firewall response.

    Priority:

    1. Prompt Injection -> BLOCK
    2. Jailbreak -> BLOCK
    3. Secret Leak -> BLOCK
    4. Risk Based Decision

    Risk:
    0-30   ALLOW
    31-70  MASK
    71-100 BLOCK
    """

    detected = detected or []


    # -------------------------------
    # AI ATTACKS
    # -------------------------------

    if "PROMPT_INJECTION" in detected:
        return "BLOCK"


    if "JAILBREAK" in detected:
        return "BLOCK"



    # -------------------------------
    # SECRET LEAKS
    # -------------------------------

    secret_types = [
        "AWS_KEY",
        "API_KEY",
        "PASSWORD"
    ]


    if any(
        secret in detected
        for secret in secret_types
    ):
        return "BLOCK"



    # -------------------------------
    # NORMAL RISK
    # -------------------------------

    if score <= 30:
        return "ALLOW"


    if score <= 70:
        return "MASK"


    return "BLOCK"