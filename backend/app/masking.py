import re

from app.detector import (
    EMAIL_PATTERN,
    PHONE_PATTERN,
    CREDIT_CARD_PATTERN,
    AADHAAR_PATTERN,
    PAN_PATTERN,
)


def mask_prompt(prompt: str) -> str:
    """
    Replace sensitive information with safe placeholders.
    """

    secured = prompt

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

    return secured