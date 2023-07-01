from model.event import Event
from typing import List
import datetime


class EventService:
    @staticmethod
    def get_all() -> List[Event]:
        return Event.query.all();

    @staticmethod
    def get_all_for_date(event_date: datetime.date) -> Event:
        return Event.query.get(event_date)

    # TODO: edit
    # TODO: delete
    # TODO: create