from event import Event
from typing import List
from datetime import datetime
import sqlite3
import json

def _get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def _format_events(events):
    formatted = []
    for row in events:
        start_datetime = datetime.strptime(row[3], '%Y-%m-%d %H:%M:%S')
        end_datetime = datetime.strptime(row[4], '%Y-%m-%d %H:%M:%S')
        formatted.append({
            'title': row[0],
            'notes': row[1],
            'precedence': row[2],
            'day_start': f"{start_datetime:%d}",
            'hour_start': f"{start_datetime:%H}",
            'minute_start': f"{start_datetime:%M}",
            'day_end': f"{end_datetime:%d}",
            'hour_end': f"{end_datetime:%H}",
            'minute_end': f"{end_datetime:%M}",
        })
    return formatted
    
### index methods ###

def get_all_events() -> list[dict[str, str]]:
    conn = _get_db_connection()
    query = "SELECT title, notes, precedence, time_start, time_end FROM events"
    cursor = conn.cursor()
    events = cursor.execute(query).fetchall()
    conn.close()
    return _format_events(events)

def get_all_events_for_month( month, year) -> list[dict[str, str]]:
    conn = _get_db_connection()
    query = "SELECT title, notes, precedence, time_start, time_end from events WHERE strftime(\'%m\', time_start) = \'{}\' AND strftime(\'%Y\', time_start) = \'{}\'".format(str(month).zfill(2), year)
    events = conn.execute(query).fetchall()
    conn.close()
    return _format_events(events)


    # TODO: edit
    # TODO: delete
    # TODO: create