import sqlite3



DATABASE = "firewall_logs.db"



def get_connection():

    conn = sqlite3.connect(DATABASE)

    return conn



def create_table():

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute("""
    
    CREATE TABLE IF NOT EXISTS logs(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        prompt TEXT,

        risk_score INTEGER,

        detected TEXT,

        action TEXT

    )

    """)


    conn.commit()

    conn.close()



def save_log(prompt, risk_score, detected, action):

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute(
        """
        INSERT INTO logs
        (
        prompt,
        risk_score,
        detected,
        action
        )

        VALUES(?,?,?,?)

        """,

        (
            prompt,
            risk_score,
            ",".join(detected),
            action
        )
    )


    conn.commit()

    conn.close()