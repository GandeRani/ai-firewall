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



def mask_prompt(prompt: str) -> str:
    """
    Replace sensitive information.
    """

    secured = prompt


    # -------------------------------
    # PII
    # -------------------------------

    secured = EMAIL_PATTERN.sub(
        "[EMAIL_MASKED]",
        secured
    )


    secured = PHONE_PATTERN.sub(
        "[PHONE_MASKED]",
        secured
    )


    secured = CREDIT_CARD_PATTERN.sub(
        "[CREDIT_CARD_MASKED]",
        secured
    )


    secured = AADHAAR_PATTERN.sub(
        "[AADHAAR_MASKED]",
        secured
    )


    secured = PAN_PATTERN.sub(
        "[PAN_MASKED]",
        secured
    )


    # -------------------------------
    # SECRETS
    # -------------------------------

    secured = AWS_KEY_PATTERN.sub(
        "[AWS_KEY_MASKED]",
        secured
    )


    secured = API_KEY_PATTERN.sub(
        "[API_KEY_MASKED]",
        secured
    )


    secured = PASSWORD_PATTERN.sub(
        "[PASSWORD_MASKED]",
        secured
    )


    return secured