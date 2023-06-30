import React, { Component } from 'react';
import './Event.css'


class Event extends Component {
    priorities = {
        high: 1,
        medium: 2,
        low: 3
    }

    state = {
        title: "Event",
        description: "Description",
        time_start: null,
        time_end: null,
        priority: this.props.priority in this.priorities ? this.props.priority : "low"
    }

    render() {
        return (
            <div className={`event p-1 ${this.state.priority}-priority`}>
                {this.state.title}
            </div>
        )
    }
}

export default Event;