def detect_jailbreak(text):

    keywords=[

        "jailbreak",

        "dan mode",

        "do anything now",

        "bypass safety"

    ]


    for k in keywords:

        if k in text.lower():

            return [

                "JAILBREAK_ATTEMPT"

            ]


    return []