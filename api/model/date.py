from datetime import datetime
from marshmallow import Schema, fields

class Date:
    def __init__(self, date_string):
        # example date_string format: '06-29-2023' == June 29, 2023
        self.date_string = date_string
        # TODO: datetime error checking
        self.date = datetime.strptime('06-29-2023', "%m-%d-%Y").date()
        self.type = type

    # def __repr__(self):
    #     return '<Date(name={self.description!r})>'.format(self=self)

class DateSchema(Schema):
    date_string = fields.Str()
    date = fields.Date()
    type = fields.Str()
    