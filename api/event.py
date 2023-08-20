from marshmallow import Schema, fields
import time
from datetime import datetime
from dateutil import parser
from precedence import Precedence
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    notes = db.Column(db.String(100), default=None)
    precedence = db.Column(db.String(10), default="low")
    time_start = db.Column(db.DateTime, nullable=False)
    time_end = db.Column(db.DateTime, nullable=False)

    def __init__(self, title, time_start_str, time_end_str, notes=None, precedence_num = 3):
        self.title = title
        self.notes = notes
        self.precedence = Precedence(precedence_num).name
        self.time_start = parser.parse(time_start_str, ignoretz=True)
        self.time_end = parser.parse(time_end_str, ignoretz=True)