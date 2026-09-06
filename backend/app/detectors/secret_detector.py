import re



def detect_secrets(text):

    result=[]


    api_pattern=r'(api[_-]?key|secret|token)\s*[:=]\s*\w+'


    if re.search(api_pattern,text.lower()):

        result.append("SECRET_KEY")


    return result