def detect_injection(text):

    patterns=[

        "ignore previous instructions",

        "reveal system prompt",

        "forget your rules",

        "developer message",

        "show hidden instructions"

    ]


    detected=[]


    lower=text.lower()


    for p in patterns:

        if p in lower:

            detected.append("PROMPT_INJECTION")
            break



    return detected