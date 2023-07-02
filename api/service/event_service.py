from model.event import Event
from typing import List
import datetime
import sqlite3
import json

class EventService:
    def __init__(self, db_connection) -> None:
        self.conn = db_connection
    
    @staticmethod
    def get_all(self) -> list[dict[str, str]]:
        events = self.conn.execute('SELECT * FROM events').fetchall()
        self.conn.close()
        return [dict(row) for row in events]

    @staticmethod
    def get_all_for_month(self, month, year) -> list[dict[str, str]]:
        # select * from events 
        events = self.conn.execute('SELECT * FROM events ').fetchall()
        self.conn.close()
        return [dict(row) for row in events]




    # TODO: edit
    # TODO: delete
    # TODO: create