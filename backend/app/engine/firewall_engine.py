from app.detectors.pii_detector import detect_pii
from app.detectors.injection_detector import detect_injection
from app.detectors.toxicity_detector import detect_toxicity
from app.detectors.secret_detector import detect_secrets
from app.detectors.jailbreak_detector import detect_jailbreak

from app.engine.masker import mask_pii



def analyze_prompt(prompt):

    detected = []

    risk_score = 0


    # -------------------------
    # 1. PII Detection
    # -------------------------

    pii = detect_pii(prompt)

    if pii:

        detected.extend(pii)

        risk_score += 40



    # -------------------------
    # 2. Prompt Injection
    # -------------------------

    injection = detect_injection(prompt)

    if injection:

        detected.extend(injection)

        risk_score += 50



    # -------------------------
    # 3. Toxicity Detection
    # -------------------------

    toxicity = detect_toxicity(prompt)

    if toxicity:

        detected.extend(toxicity)

        risk_score += 30



    # -------------------------
    # 4. Secret Detection
    # -------------------------

    secrets = detect_secrets(prompt)

    if secrets:

        detected.extend(secrets)

        risk_score += 40



    # -------------------------
    # 5. Jailbreak Detection
    # -------------------------

    jailbreak = detect_jailbreak(prompt)

    if jailbreak:

        detected.extend(jailbreak)

        risk_score += 50



    # -------------------------
    # Final Decision
    # -------------------------

    if risk_score >= 80:

        action = "BLOCK"


    elif risk_score >= 40:

        action = "MASK"


    else:

        action = "ALLOW"



    # -------------------------
    # Response
    # -------------------------

    response = {

        "risk_score": risk_score,

        "detected": detected,

        "action": action

    }



    # If sensitive information found
    # create secured prompt

    if action == "MASK":

        response["secured_prompt"] = mask_pii(prompt)



    elif action == "BLOCK":

        response["secured_prompt"] = None



    else:

        response["secured_prompt"] = prompt



    return response