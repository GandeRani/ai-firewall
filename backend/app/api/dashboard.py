from fastapi import APIRouter

from app.api.firewall import security_logs


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats():

    total_requests = len(security_logs)

    blocked_requests = sum(
        1
        for log in security_logs
        if log["action"] == "BLOCK"
    )

    masked_requests = sum(
        1
        for log in security_logs
        if log["action"] == "MASK"
    )

    allowed_requests = sum(
        1
        for log in security_logs
        if log["action"] == "ALLOW"
    )

    pii_count = sum(
        1
        for log in security_logs
        if any(
            threat in log["detected"]
            for threat in [
                "EMAIL",
                "PHONE",
                "CREDIT_CARD",
                "AADHAAR",
                "PAN",
            ]
        )
    )

    injection_count = sum(
        1
        for log in security_logs
        if "PROMPT_INJECTION" in log["detected"]
    )

    jailbreak_count = sum(
        1
        for log in security_logs
        if "JAILBREAK" in log["detected"]
    )

    if total_requests > 0:
        average_risk_score = round(
            sum(
                log["risk_score"]
                for log in security_logs
            ) / total_requests,
            2
        )
    else:
        average_risk_score = 0

    return {
        "total_requests": total_requests,
        "blocked_requests": blocked_requests,
        "masked_requests": masked_requests,
        "allowed_requests": allowed_requests,
        "average_risk_score": average_risk_score,
        "pii_detected": pii_count,
        "injection_attacks": injection_count,
        "jailbreak_attacks": jailbreak_count,
        "firewall_status": "ACTIVE",
    }