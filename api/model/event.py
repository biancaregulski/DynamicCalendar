from marshmallow import Schema, fields
import time
from .date import Date
from .priority import Priority

class Event:
    def __init__(self, name, description, time_start_str, time_end_str, priority_num = 3):
        self.name = name
        self.description = description
        self.time_start = time.strptime(time_start_str, "%H%M") 
        self.time_end = time.strptime(time_end_str, "%H%M")
        self.priority = Priority(priority_num).name
        
    # def __repr__(self):
    #     return '<Event(name={self.description!r})>'.format(self=self)

class EventSchema(Schema):
    name = fields.Str()
    description = fields.Str()
    time_start = fields.Date()
    time_end = fields.Str()