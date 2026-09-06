import re



def mask_pii(text):

    # Mask email

    text = re.sub(
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b',
        "[EMAIL_MASKED]",
        text
    )


    # Mask phone numbers

    text = re.sub(
        r'\b\d{10}\b',
        "[PHONE_MASKED]",
        text
    )


    # Mask Aadhaar

    text = re.sub(
        r'\b\d{12}\b',
        "[AADHAAR_MASKED]",
        text
    )


    return text