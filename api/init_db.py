import sqlite3
from datetime import datetime

connection = sqlite3.connect('database.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO events (title, notes, time_start, time_end, precedence) VALUES (?, ?, ?, ?, ?)",
            ('Practice Piano', '30 minutes for Bach, 30 minutes for jazz', datetime.strptime("070220231400", "%m%d%Y%H%M"), datetime.strptime("070220231500", "%m%d%Y%H%M"), "low" )
            )

cur.execute("INSERT INTO events (title, notes, time_start, time_end, precedence) VALUES (?, ?, ?, ?, ?)",
            ('Jog', None, datetime.strptime("070220231500", "%m%d%Y%H%M"), datetime.strptime("070220231530", "%m%d%Y%H%M"), "medium" )
            )

cur.execute("INSERT INTO events (title, notes, time_start, time_end, precedence) VALUES (?, ?, ?, ?, ?)",
            ('june event', None, datetime.strptime("060220231500", "%m%d%Y%H%M"), datetime.strptime("070220231530", "%m%d%Y%H%M"), "medium" )
            )

cur.execute("INSERT INTO events (title, notes, time_start, time_end, precedence) VALUES (?, ?, ?, ?, ?)",
            ('2022 event', None, datetime.strptime("060220221500", "%m%d%Y%H%M"), datetime.strptime("070220231530", "%m%d%Y%H%M"), "medium" )
            )

connection.commit()
connection.close()