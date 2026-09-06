def detect_toxicity(text):

    words=[

        "kill",

        "attack",

        "hate",

        "violence"

    ]


    for w in words:

        if w in text.lower():

            return ["TOXIC_CONTENT"]


    return []