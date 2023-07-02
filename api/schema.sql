DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    notes TEXT,
    time_start DATETIME NOT NULL,
    time_end DATETIME NOT NULL,
    precedence TEXT NOT NULL 
);