import re


# ============================================================
# PII PATTERNS
# ============================================================

EMAIL_PATTERN = re.compile(
    r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
)

PHONE_PATTERN = re.compile(
    r"(?<!\d)(?:\+91[\s-]?)?[6-9]\d{9}(?!\d)"
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
# PROMPT INJECTION PATTERNS
# ============================================================

PROMPT_INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?previous\s+instructions",
    r"ignore\s+(all\s+)?prior\s+instructions",
    r"forget\s+(all\s+)?your\s+instructions",
    r"forget\s+(all\s+)?previous\s+instructions",
    r"override\s+(the\s+)?system\s+prompt",
    r"override\s+(all\s+)?instructions",
    r"disregard\s+(all\s+)?previous\s+rules",
    r"disregard\s+(all\s+)?previous\s+instructions",
    r"reveal\s+(the\s+)?system\s+prompt",
    r"show\s+(me\s+)?the\s+system\s+prompt",
    r"print\s+(the\s+)?system\s+prompt",
    r"what\s+is\s+your\s+system\s+prompt",
]


# ============================================================
# JAILBREAK PATTERNS
# ============================================================

JAILBREAK_PATTERNS = [
    r"\bact\s+as\s+dan\b",
    r"\bdo\s+anything\s+now\b",
    r"ignore\s+safety\s+restrictions",
    r"ignore\s+safety\s+rules",
    r"bypass\s+safety",
    r"bypass\s+security",
    r"no\s+restrictions",
    r"without\s+restrictions",
    r"unrestricted\s+ai",
    r"unfiltered\s+ai",
    r"remove\s+all\s+safety",
    r"disable\s+safety",
]


# ============================================================
# DETECTION FUNCTIONS
# ============================================================

def detect_pii(prompt: str) -> list[str]:
    """
    Detect personally identifiable information.
    """

    detected = []

    if EMAIL_PATTERN.search(prompt):
        detected.append("EMAIL")

    if PHONE_PATTERN.search(prompt):
        detected.append("PHONE")

    if CREDIT_CARD_PATTERN.search(prompt):
        detected.append("CREDIT_CARD")

    if AADHAAR_PATTERN.search(prompt):
        detected.append("AADHAAR")

    if PAN_PATTERN.search(prompt):
        detected.append("PAN")

    return detected


def detect_prompt_injection(prompt: str) -> list[str]:
    """
    Detect common prompt injection attempts.
    """

    detected = []

    for pattern in PROMPT_INJECTION_PATTERNS:
        if re.search(pattern, prompt, re.IGNORECASE):
            detected.append("PROMPT_INJECTION")
            break

    return detected


def detect_jailbreak(prompt: str) -> list[str]:
    """
    Detect common jailbreak attempts.
    """

    detected = []

    for pattern in JAILBREAK_PATTERNS:
        if re.search(pattern, prompt, re.IGNORECASE):
            detected.append("JAILBREAK")
            break

    return detected


def detect_threats(prompt: str) -> list[str]:
    """
    Run all firewall detectors.
    """

    detected = []

    detected.extend(detect_pii(prompt))
    detected.extend(detect_prompt_injection(prompt))
    detected.extend(detect_jailbreak(prompt))

    return detected