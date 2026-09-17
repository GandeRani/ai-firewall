import re

from app.detector import (
    EMAIL_PATTERN,
    PHONE_PATTERN,
    CREDIT_CARD_PATTERN,
    AADHAAR_PATTERN,
    PAN_PATTERN,
    AWS_KEY_PATTERN,
    API_KEY_PATTERN,
    PASSWORD_PATTERN,
)


# ============================================================
# MASK SENSITIVE INFORMATION
# ============================================================

def mask_prompt(prompt: str) -> str:
    """
    Replace sensitive information with safe placeholders.
    """

    secured = prompt


    # ========================================================
    # PII MASKING
    # ========================================================

    # Email
    secured = EMAIL_PATTERN.sub(
        "[EMAIL_MASKED]",
        secured
    )


    # Phone
    secured = PHONE_PATTERN.sub(
        "[PHONE_MASKED]",
        secured
    )


    # Credit Card
    secured = CREDIT_CARD_PATTERN.sub(
        "[CREDIT_CARD_MASKED]",
        secured
    )


    # Aadhaar
    secured = AADHAAR_PATTERN.sub(
        "[AADHAAR_MASKED]",
        secured
    )


    # PAN
    secured = PAN_PATTERN.sub(
        "[PAN_MASKED]",
        secured
    )



    # ========================================================
    # SECRET MASKING
    # ========================================================

    # AWS Access Key
    secured = AWS_KEY_PATTERN.sub(
        "[AWS_KEY_MASKED]",
        secured
    )


    # API Key
    secured = API_KEY_PATTERN.sub(
        "[API_KEY_MASKED]",
        secured
    )


    # Password / Secret
    secured = PASSWORD_PATTERN.sub(
        "[PASSWORD_MASKED]",
        secured
    )


    return secured