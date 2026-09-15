# ============================================================
# AI FIREWALL - RISK ENGINE
# ============================================================

# ============================================================
# RISK WEIGHTS
# ============================================================

RISK_WEIGHTS = {
    # PII
    "EMAIL": 40,
    "PHONE": 40,
    "CREDIT_CARD": 60,
    "AADHAAR": 60,
    "PAN": 50,

    # AI SECURITY THREATS
    # High enough to reach DANGER level
    "PROMPT_INJECTION": 80,
    "JAILBREAK": 90,
}


# ============================================================
# RISK CALCULATION
# ============================================================

def calculate_risk(detected: list[str]) -> int:
    """
    Calculate the overall risk score.

    The score is calculated by adding the risk weight
    of every detected threat.

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
    Decide the firewall action.

    Priority:
        1. Prompt Injection -> BLOCK
        2. Jailbreak        -> BLOCK
        3. Risk score       -> ALLOW / MASK / BLOCK

    Normal PII:
        0-30   -> ALLOW
        31-70  -> MASK
        71-100 -> BLOCK
    """

    detected = detected or []

    # --------------------------------------------------------
    # SECURITY ATTACKS
    # --------------------------------------------------------
    # These attacks should NEVER be simply masked.
    # They must be blocked.
    # --------------------------------------------------------

    if "PROMPT_INJECTION" in detected:
        return "BLOCK"

    if "JAILBREAK" in detected:
        return "BLOCK"

    # --------------------------------------------------------
    # NORMAL RISK-BASED DECISION
    # --------------------------------------------------------

    if score <= 30:
        return "ALLOW"

    if score <= 70:
        return "MASK"

    return "BLOCK"