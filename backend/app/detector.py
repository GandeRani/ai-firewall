import re


# ============================================================
# PII PATTERNS
# ============================================================

EMAIL_PATTERN = re.compile(
    r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
)


PHONE_PATTERN = re.compile(
    r"(?<!\d)(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}(?!\d)"
)


CREDIT_CARD_PATTERN = re.compile(
    r"(?<!\d)(?:\d{4}[\s-]?){3}\d{4}(?!\d)"
)


AADHAAR_PATTERN = re.compile(
    r"(?<!\d)\d{4}[\s-]?\d{4}[\s-]?\d{4}(?!\d)"
)


PAN_PATTERN = re.compile(
    r"\b[A-Z]{5}[0-9]{4}[A-Z]\b",
    re.IGNORECASE
)



# ============================================================
# SECRET PATTERNS
# ============================================================


# AWS Access Key
AWS_KEY_PATTERN = re.compile(
    r"\bAKIA[0-9A-Z]{16}\b"
)


# API Keys
# Example:
# sk-abcdefghijklmnopqrstuvwxyz
API_KEY_PATTERN = re.compile(
    r"\b(sk-[A-Za-z0-9_-]{10,})\b"
)


# Password / Secret
PASSWORD_PATTERN = re.compile(
    r"(?i)\b(password|passwd|pwd|secret)\s*[:=]\s*\S+"
)



# ============================================================
# PROMPT INJECTION PATTERNS
# ============================================================

PROMPT_INJECTION_PATTERNS = [

    r"ignore\s+(all\s+)?previous\s+instructions",

    r"ignore\s+(all\s+)?prior\s+instructions",

    r"forget\s+(all\s+)?previous\s+instructions",

    r"forget\s+(all\s+)?your\s+instructions",

    r"override\s+(the\s+)?system\s+prompt",

    r"override\s+(all\s+)?instructions",

    r"disregard\s+(all\s+)?previous\s+instructions",

    r"reveal\s+(the\s+)?system\s+prompt",

    r"show\s+(me\s+)?the\s+system\s+prompt",

    r"print\s+(the\s+)?system\s+prompt",
]



# ============================================================
# JAILBREAK PATTERNS
# ============================================================

JAILBREAK_PATTERNS = [

    r"\bact\s+as\s+dan\b",

    r"\bdo\s+anything\s+now\b",

    r"bypass\s+safety",

    r"bypass\s+security",

    r"ignore\s+safety\s+rules",

    r"ignore\s+safety\s+restrictions",

    r"remove\s+all\s+safety",

    r"disable\s+safety",

    r"unrestricted\s+ai",

    r"unfiltered\s+ai",

    r"without\s+restrictions",

    r"operating\s+in\s+unrestricted\s+mode",

    r"enable\s+unrestricted\s+mode",

    r"enter\s+unrestricted\s+mode",

    r"remove\s+all\s+restrictions",

    r"ignore\s+all\s+limitations",

    r"disable\s+all\s+guardrails",

    r"no\s+restrictions",

]



# ============================================================
# DETECT PII
# ============================================================

def detect_pii(prompt: str) -> list[str]:

    detected = []

    credit_card_found = False


    if CREDIT_CARD_PATTERN.search(prompt):
        detected.append("CREDIT_CARD")
        credit_card_found = True


    if EMAIL_PATTERN.search(prompt):
        detected.append("EMAIL")


    if PHONE_PATTERN.search(prompt):
        detected.append("PHONE")


    if not credit_card_found:

        if AADHAAR_PATTERN.search(prompt):
            detected.append("AADHAAR")


    if PAN_PATTERN.search(prompt):
        detected.append("PAN")


    return detected



# ============================================================
# DETECT SECRETS
# ============================================================

def detect_secrets(prompt: str) -> list[str]:

    detected = []


    if AWS_KEY_PATTERN.search(prompt):
        detected.append("AWS_KEY")


    if API_KEY_PATTERN.search(prompt):
        detected.append("API_KEY")


    if PASSWORD_PATTERN.search(prompt):
        detected.append("PASSWORD")


    return detected



# ============================================================
# DETECT PROMPT INJECTION
# ============================================================

def detect_prompt_injection(prompt: str) -> list[str]:

    detected = []


    for pattern in PROMPT_INJECTION_PATTERNS:

        if re.search(pattern, prompt, re.IGNORECASE):

            detected.append("PROMPT_INJECTION")
            break


    return detected



# ============================================================
# DETECT JAILBREAK
# ============================================================

def detect_jailbreak(prompt: str) -> list[str]:

    detected = []


    for pattern in JAILBREAK_PATTERNS:

        if re.search(pattern, prompt, re.IGNORECASE):

            detected.append("JAILBREAK")
            break


    return detected



# ============================================================
# MAIN FIREWALL DETECTOR
# ============================================================

def detect_threats(prompt: str) -> list[str]:

    threats = []


    threats.extend(
        detect_pii(prompt)
    )


    threats.extend(
        detect_secrets(prompt)
    )


    threats.extend(
        detect_prompt_injection(prompt)
    )


    threats.extend(
        detect_jailbreak(prompt)
    )


    return threats