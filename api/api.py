import time
import os
from flask import Flask, request
from helper.sql_helper import get_all_events, get_all_events_for_month
import sqlite3

from model.event import Event
# from healthcheck import HealthCheck

app = Flask(__name__)

# health = HealthCheck()

events = [
    Event('Work' , '', '070320230900', '070320231700'),
    Event('Taekwondo Practice' , '', '070320231800', '070320231900')
]


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
    income = EventSchema().load(request.get_json())
    # add event to db
    return "", 204



