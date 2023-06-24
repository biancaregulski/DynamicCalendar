import React from 'react';

function Event() {
    state = {
        title: "Event",
        description: "Description",
        time_start: null,
        time_end: null,
        priority: 3
    }

    priorities = {
        1: "high",
        2: "medium",
        3: "low"
    }

    return (
        <div className={`event-${priority}`}>
            {title}
        </div>
    )
}

export default Event;