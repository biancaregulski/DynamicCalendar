import React, { Component } from 'react';
import Event from './Event.js'

const Day = ({ showModal, dayNum, currentDay }) => {
    var events = [
        <Event title="Work" hourStart={9} minuteStart={0} hourEnd={17} minuteEnd={0} priority={"high"}></Event>,
        <Event title="Taekwondo Practice" hourStart={18} minuteStart={0} hourEnd={19} minuteEnd={0} priority={"low"}></Event>
    ]

    return(
        <td key={dayNum} onClick={() => showModal(dayNum, events)} className={`calendar-day ${(currentDay ? "table-primary" : "")}`}>
            {dayNum}
            {events}
        </td>
    );
}

export default Day;