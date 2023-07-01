import time
import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

from model.date import Date
from model.event import Event
# from healthcheck import HealthCheck

# basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] =\
#            'sqlite:///' + os.path.join(basedir, 'database.db')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# health = HealthCheck()

dates = [
    Date("06-29-2023")
]

events = [
    Event('Work' , '', '0900', '1700'),
    Event('Taekwondo Practice' , '', '1800', '1900')
]

@app.route('/health')
def healthcheck():
    return { 'status': 'healthy' }

@app.route('/time')
def get_current_time():
    return { 'time': time.time() }

@app.route('/events', methods=['GET'])
def get_events_for_day():
    args = request.args
    date_str = args.get("date")
    # events = 
    return args


    #### commands: ####
    # python -m flask run
    # python -m flask shell
    # python -m pip install -U {package-name}
    # yarn start / npm start

    # possible routes:
    # all events for one month