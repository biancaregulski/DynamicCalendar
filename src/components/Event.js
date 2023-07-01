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
        description: this.props.title || "Description",
        hourStart: this.props.hourStart,
        minuteStart: this.props.minuteStart,
        hourEnd: this.props.hourEnd,
        minuteEnd: this.props.minuteEnd,
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