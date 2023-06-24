import React, { Component } from 'react';
import Event from './Event.js'

const Day = ({ showModal, dayNum, currentDay, events }) => {
    return(
        <td key={dayNum} onClick={() => showModal(dayNum, events)} className={`calendar-day ${(currentDay ? "table-primary" : "")}`}>
            {dayNum}
            <Event></Event>
            <Event priority={2}></Event>
        </td>
    );
}

export default Day;