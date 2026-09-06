# ============================================================
# RISK WEIGHTS
# ============================================================

RISK_WEIGHTS = {
    "EMAIL": 40,
    "PHONE": 40,
    "CREDIT_CARD": 60,
    "AADHAAR": 60,
    "PAN": 50,

    "PROMPT_INJECTION": 50,
    "JAILBREAK": 60,
}


# ============================================================
# RISK CALCULATION
# ============================================================

def calculate_risk(detected: list[str]) -> int:
    """
    Calculate total risk score.

    Score is capped at 100.
    """

    score = 0

    for threat in detected:
        score += RISK_WEIGHTS.get(threat, 0)

    return min(score, 100)


# ============================================================
# ACTION DECISION
# ============================================================

def determine_action(score: int) -> str:
    """
    Decide what the firewall should do.

    0-30   -> ALLOW
    31-70  -> MASK
    71-100 -> BLOCK
    """

    if score <= 30:
        return "ALLOW"

    if score <= 70:
        return "MASK"

    return "BLOCK"