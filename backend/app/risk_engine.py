# ============================================================
# AI FIREWALL - RISK ENGINE
# ============================================================


# ============================================================
# RISK WEIGHTS
# ============================================================

RISK_WEIGHTS = {

    # ========================================================
    # PII
    # ========================================================

    "EMAIL": 40,
    "PHONE": 40,
    "CREDIT_CARD": 60,
    "AADHAAR": 60,
    "PAN": 50,


    # ========================================================
    # SECRET / CREDENTIAL LEAKS
    # ========================================================

    "AWS_KEY": 80,
    "API_KEY": 80,
    "PASSWORD": 70,


    # ========================================================
    # AI SECURITY THREATS
    # ========================================================

    "PROMPT_INJECTION": 80,
    "JAILBREAK": 90,
}



# ============================================================
# RISK CALCULATION
# ============================================================

def calculate_risk(detected: list[str]) -> int:
    """
    Calculate the overall risk score.

    Score is calculated by adding
    weights of detected threats.

    Maximum score = 100.
    """

    score = 0

    for threat in detected:
        score += RISK_WEIGHTS.get(threat, 0)

    return min(score, 100)



# ============================================================
# ACTION DECISION
# ============================================================

def determine_action(
    score: int,
    detected: list[str] | None = None
) -> str:
    """
    Decide firewall action.

    Priority:

    1. Prompt Injection -> BLOCK
    2. Jailbreak        -> BLOCK
    3. Secret Leakage   -> BLOCK
    4. Risk score       -> ALLOW / MASK / BLOCK


    Risk levels:

    0-30   -> ALLOW
    31-70  -> MASK
    71-100 -> BLOCK
    """


    detected = detected or []



    # ========================================================
    # AI ATTACKS
    # ========================================================

    if "PROMPT_INJECTION" in detected:
        return "BLOCK"


    if "JAILBREAK" in detected:
        return "BLOCK"



    # ========================================================
    # SECRET LEAKS
    # ========================================================

    if "AWS_KEY" in detected:
        return "BLOCK"


    if "API_KEY" in detected:
        return "BLOCK"


    if "PASSWORD" in detected:
        return "BLOCK"



    # ========================================================
    # NORMAL RISK DECISION
    # ========================================================

    if score <= 30:
        return "ALLOW"


    if score <= 70:
        return "MASK"


    return "BLOCK"