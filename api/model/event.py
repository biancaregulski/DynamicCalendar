from marshmallow import Schema, fields
import time
from .date import Date
import random
from .priority import Priority


class Event:
    def __init__(self, date_id, name, description, time_start_str, time_end_str, priority_num = 3):
        self.date_id = random.randint(1, 1000000) 
        self.date_id = date_id
        self.name = name
        self.description = description
        self.time_start = time.strptime(time_start_str, "%H%M") 
        self.time_end = time.strptime(time_end_str, "%H%M")
        self.priority = Priority(priority_num).name
        
    # def __repr__(self):
    #     return '<Event(name={self.description!r})>'.format(self=self)

class EventSchema(Schema):
    date_id = fields.Int()
    name = fields.Str()
    description = fields.Str()
    time_start = fields.Date()
    time_end = fields.Str()