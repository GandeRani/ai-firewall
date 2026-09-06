from app.detectors.pii_detector import detect_pii
from app.detectors.injection_detector import detect_injection
from app.detectors.toxicity_detector import detect_toxicity
from app.detectors.secret_detector import detect_secrets
from app.detectors.jailbreak_detector import detect_jailbreak



def analyze_prompt(prompt):

    detected = []

    risk_score = 0


    pii = detect_pii(prompt)

    if pii:
        detected.extend(pii)
        risk_score += 40



    injection = detect_injection(prompt)

    if injection:
        detected.extend(injection)
        risk_score += 50



    toxicity = detect_toxicity(prompt)

    if toxicity:
        detected.extend(toxicity)
        risk_score += 30



    secrets = detect_secrets(prompt)

    if secrets:
        detected.extend(secrets)
        risk_score += 40



    jailbreak = detect_jailbreak(prompt)

    if jailbreak:
        detected.extend(jailbreak)
        risk_score += 50



    if risk_score >= 80:
        action="BLOCK"

    elif risk_score >=40:
        action="MASK"

    else:
        action="ALLOW"



    return {

        "risk_score": risk_score,

        "detected": detected,

        "action": action

    }