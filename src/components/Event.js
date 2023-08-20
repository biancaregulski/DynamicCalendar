import React, { Component } from 'react';
import './Event.css'

class Event extends Component {
    priorities = {
        high: 1,
        medium: 2,
        low: 3
    }

    state = {
        title: this.props.title || "Event",
        notes: this.props.notes || "Notes",
        // dayStart: this.props.dayStart,
        hourStart: this.props.hourStart,
        minuteStart: this.props.minuteStart,
        // dayEnd: this.props.dayEnd,
        hourEnd: this.props.hourEnd,
        minuteEnd: this.props.minuteEnd,
        priority: this.props.priority.toLowerCase() in this.priorities ? this.props.priority.toLowerCase() : "low"
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