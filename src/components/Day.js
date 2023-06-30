import React, { Component } from 'react';
import Event from './Event.js'

const Day = ({ showModal, dayNum, currentDay }) => {
    var events = [
        <Event title="Work" priority={"high"}></Event>,
        <Event title="Taekwondo Practice" priority={"low"}></Event>
    ]

    return(
        <td key={dayNum} onClick={() => showModal(dayNum, events)} className={`calendar-day ${(currentDay ? "table-primary" : "")}`}>
            {dayNum}
            {events}
        </td>
    );
}

export default Day;