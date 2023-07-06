from marshmallow import Schema, fields
import time
from datetime import datetime
from precedence import Precedence
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(100), default=None)
    precedence = db.Column(db.String(10), default="low")
    time_start = db.Column(db.DateTime, nullable=False)
    time_end = db.Column(db.DateTime, nullable=False)

    def __init__(self, title, time_start_str, time_end_str, notes=None, precedence_num = 3):
        self.title = title
        self.notes = notes
        self.precedence = Precedence(precedence_num).name
        self.time_start = datetime.strptime(time_start_str, "%m%d%Y%H%M") 
        self.time_end = datetime.strptime(time_end_str, "%m%d%Y%H%M")

"070520232000"

# class EventSchema(Schema):
#     name = fields.Str()
#     notes = fields.Str()
#     time_start = fields.DateTime()
#     time_end = fields.DateTime()
#     precedence = fields.Str()