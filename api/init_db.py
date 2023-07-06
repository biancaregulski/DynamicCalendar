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

# add
event = Event(title="Taekwondo Practice", time_start_str="070520232000", time_end_str="070520232100", precedence_num=3)
db.session.add(event)
db.session.commit()

# update
event = Event.query.get_or_404(id)
event.precedence = 'HIGH'
db.session.add(event)
db.session.commit()

# get all
Event.query.all()

# get with filter
Event.query.filter_by(precedence='HIGH').all()

# delete
event = Event.query.get_or_404(id)
Event.query.filter_by(precedence='HIGH').first()
db.session.delete(event)
db.session.commit()

# send id back to react and save it, but not display so that it can be deleted/updatedhere