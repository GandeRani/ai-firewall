import json
import os
from datetime import datetime


FILE_PATH="app/database/logs.json"



def save_log(data):

    if not os.path.exists(FILE_PATH):

        with open(FILE_PATH,"w") as f:
            json.dump([],f)



    with open(FILE_PATH,"r") as f:

        logs=json.load(f)



    data["timestamp"]=str(datetime.now())


    logs.append(data)



    with open(FILE_PATH,"w") as f:

        json.dump(logs,f,indent=4)



def get_logs():

    with open(FILE_PATH,"r") as f:

        return json.load(f)