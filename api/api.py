import time
import os
from flask import Flask, request
from sql_helper import get_all_events, get_all_events_for_month
import sqlite3
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from event import db

# from healthcheck import HealthCheck

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# health = HealthCheck()

# events = [
#     Event('Work' , '', '070320230900', '070320231700'),
#     Event('Taekwondo Practice' , '', '070320231800', '070320231900')
# ]

db.init_app(app) #Add this line Before migrate line
db.app = app
# db.create_all()

@app.route('/health')
def healthcheck():
    return { 'status': 'ok' }

@app.route('/events', methods=['GET'])
def get_events() -> list[dict[str, str]]:
    args = request.args
    # TODO: error checking, check for valid months and years
    # single digit months must be in format 0X
    month, year = args.get("month"), args.get("year")
    if month and year:
        return get_all_events_for_month(month, year)
    else:
        return get_all_events()

# https://auth0.com/blog/developing-restful-apis-with-python-and-flask/#Securing-Python-APIs-with-Auth0
@app.route('/events', methods=['POST'])
def add_event():
    # move this to sql helper
    # use sqlalchemy to link schema with sqlite3
    event = EventSchema().load(request.get_json())
    # add event to db
    return "", 204



