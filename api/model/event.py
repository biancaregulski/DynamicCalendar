from marshmallow import Schema, fields
import time
from datetime import datetime
from .priority import Priority

class Event:
    def __init__(self, name, description, time_start_str, time_end_str, priority_num = 3):
        self.name = name
        self.description = description
        self.date = datetime.strptime(time_start_str, "%m-%d-%Y").date()
        self.time_start = time.strptime(time_start_str, "%H%M") 
        self.time_end = time.strptime(time_end_str, "%H%M")
        self.priority = Priority(priority_num).name

class EventSchema(Schema):
    name = fields.Str()
    description = fields.Str()
    date = fields.Date()
    time_start = fields.Time()
    time_end = fields.Time()
    priority = fields.Str()