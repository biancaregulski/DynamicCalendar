from marshmallow import Schema, fields
import time
from datetime import datetime
from .precedence import Precedence

class Event:
    def __init__(self, name, notes, time_start_str, time_end_str, priority_num = 3):
        self.name = name
        self.notes = notes
        self.time_start = datetime.strptime(time_start_str, "%m%d%Y%H%M") 
        self.time_end = datetime.strptime(time_end_str, "%m%d%Y%H%M")
        self.precedence = Precedence(priority_num).name

class EventSchema(Schema):
    name = fields.Str()
    notes = fields.Str()
    time_start = fields.DateTime()
    time_end = fields.DateTime()
    precedence = fields.Str()