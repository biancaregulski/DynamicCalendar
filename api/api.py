import os
from flask import Flask, jsonify, request
from sqlalchemy.sql import func
from event import db
from event import Event
from datetime import datetime
import calendar
from sql_helper import format_events

# from healthcheck import HealthCheck

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
db.app = app

@app.route('/health')
def healthcheck():
    return { 'status': 'ok' }

@app.route('/events', methods=['GET'])
def get_events() -> list[dict[str, str]]:
    args = request.args
    # TODO: error checking, check for valid months and years
    # single digit months must be in format 0X
    month, year = int(args.get("month")), int(args.get("year"))
    if month and year:
        # return events from selected month and year
        last_day_of_month = calendar.monthrange(year, month)[1]
        events = (
            db.session.query(Event.title, Event.notes, Event.precedence, Event.time_start, Event.time_end)
            .filter(
                (Event.time_start.between(datetime(year, month, 1), datetime(year, month, last_day_of_month))) |
                (Event.time_end.between(datetime(year, month, 1), datetime(year, month, last_day_of_month)))
            )
        )
        return format_events(events)
    else:
        # return all events
        events = db.session.query(Event.title, Event.notes, Event.precedence, Event.time_start, Event.time_end).all()
        return format_events(events)

@app.route('/events', methods=['POST'])
def add_event():
    event_data = request.json
    notes = event_data['notes'] if 'notes' in event_data else None
    precedence_num = int(event_data['precedence_num']) if 'precedence_num' in event_data else None

    event = Event(
        event_data["title"],
        event_data["time_start_str"],
        event_data["time_end_str"],
        notes,
        precedence_num
    )
    db.session.add(event)
    db.session.commit()
    return jsonify(status='success')

@app.route('/delete/<id>')
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify(status='success')

@app.route('/events/<id>', methods=['PUT'])
def update_event(id):
    event = Event.query.get_or_404(id)
    event_data = request.json
    for key,value in event_data.items(): 
        setattr(event,key,value)  
    db.session.commit()
    return jsonify(status='success')