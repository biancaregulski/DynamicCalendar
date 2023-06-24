import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Event from './Event.js'
import Modal from './Modal.js'

class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            dateContext: moment(),
            selectedDay: null
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    // state = {
    //     dateContext: moment(),
    //     selectedDay: null
    // }

    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext)
                        .startOf("month")
                        .format("d");
        return firstDay;    
    }

    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    currentMonth = () => {
        return this.state.dateContext.format("MMMM");
    }

    render() {
        let weekdaysShort = moment.weekdaysShort();

       let weekdays = weekdaysShort.map(day => {
            return (
                <th key={day} scope="col" className="weekday text-center">
                    {day}
                </th>
            );
        });
    
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td className="calendar-day table-secondary">{""}</td>
            );
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d} onClick={this.showModal} className={`calendar-day ${(d == this.currentDay() ? "table-primary" : "")}`}>
                    {d}    
                    <Event></Event>
                    <Event priority={2}></Event>
                </td>
            )
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            }
            else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        let trElems = rows.map((day, index) => {
            return ( 
                <tr className="weekday-rows" key={index}>
                    {day}
                </tr>
            )
        });

        function addEvent() {
            alert('You clicked me!');
        }

        return (
            <>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Modal</p>
                </Modal>
                <div>
                    <div className='d-flex justify-content-between'>
                        <button className="top-button m-1 p-2" onClick={addEvent}>Dynamically Add Event</button>
                        <h3 className="text-center">{this.currentMonth()}</h3>
                        <button className="top-button m-1 p-2">TBA</button>
                    </div>
                    <table className="table calendar-table">
                        <thead>
                            <tr>
                                {weekdays}
                            </tr>
                        </thead>
                        <tbody id="calendar-body">
                            {trElems}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Calendar;
