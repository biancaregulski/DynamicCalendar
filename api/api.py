import time
from flask import Flask, request
# from healthcheck import HealthCheck

from model.date import Date
from model.event import Event

app = Flask(__name__)

# health = HealthCheck()

dates = [
    Date('24052010')
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
    date = Date(date_str)
    return args


    #### commands: ####
    # python -m flask run
    # python -m flask shell
    # python -m pip install -U {package-name}
    # yarn start / npm start

    # possible routes:
    # all events for one month