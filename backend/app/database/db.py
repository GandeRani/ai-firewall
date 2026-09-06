import sqlite3


DATABASE = "firewall.db"


def get_connection():

    conn = sqlite3.connect(DATABASE)

    return conn



def create_table():

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS logs(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            prompt TEXT,

            risk_score INTEGER,

            detected TEXT,

            action TEXT,

            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP

        )
        """
    )


    conn.commit()

    conn.close()