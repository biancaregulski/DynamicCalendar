
from typing import List
from api import db

def format_events(events):
    formatted = []
    for row in events:
        formatted.append({
            'title': row[0],
            'notes': row[1],
            'precedence': row[2],
            # parsing start datetime:
            'day_start': f"{row[3]:%d}",
            'hour_start': f"{row[3]:%H}",
            'minute_start': f"{row[3]:%M}",
            # parsing end datetime:
            'day_end': f"{row[4]:%d}",
            'hour_end': f"{row[4]:%H}",
            'minute_end': f"{row[4]:%M}",
        })
    return formatted