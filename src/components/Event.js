import React, { Component } from 'react';
import './Event.css'

class Event extends Component {
    state = {
        title: "Event",
        description: "Description",
        time_start: null,
        time_end: null,
        priority: this.props.priority || 3
    }

    priorities = {
        1: "high",
        2: "med",
        3: "low"
    }

    render() {
        return (
            <div className={`event p-1 ${this.priorities[this.state.priority]}-priority`}>
                {this.state.title}
            </div>
        )
    }
}

export default Event;