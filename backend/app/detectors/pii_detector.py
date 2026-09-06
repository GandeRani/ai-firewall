import re



def detect_pii(text):

    result=[]


    email = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'


    phone = r'\b\d{10}\b'


    if re.search(email,text):

        result.append("EMAIL")


    if re.search(phone,text):

        result.append("PHONE_NUMBER")


    if "aadhaar" in text.lower():

        result.append("AADHAAR")



    return result