import time
import os
from flask import Flask, request
from service.event_service import EventService
import sqlite3

from model.event import Event
# from healthcheck import HealthCheck

app = Flask(__name__)

# TODO: move to utils
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

event_service = EventService(get_db_connection())
# health = HealthCheck()

events = [
    Event('Work' , '', '070320230900', '070320231700'),
    Event('Taekwondo Practice' , '', '070320231800', '070320231900')
]


@app.route('/health')
def healthcheck():
    return { 'status': 'healthy' }

@app.route('/events', methods=['GET'])
def get_events() -> list[dict[str, str]]:
    args = request.args
    month, year = args.get("month"), args.get("year")
    if month and year:
        return event_service.get_all_for_month(month, year)
    else:
        return event_service.get_all()


