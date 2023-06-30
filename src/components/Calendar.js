import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Modal from './Modal.js'
import Day from './Day.js'

class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            modalVisibility: false,
            dateContext: moment(),
            selectedDay: null,
            selectedEvents: []
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = (selectedDay, selectedEvents) => {
        this.setState({ modalVisibility: true, selectedDay: selectedDay, selectedEvents: selectedEvents });
    }

    hideModal = () => {
        this.setState({ modalVisibility: false });
    }

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
    
    currentDayOfWeek = () => {
        return this.state.dateContext.isoWeekday();
    }

    currentMonth = () => {
        return this.state.dateContext.format("MMMM");
    }

    render() {
       let weekdaysShort = moment.weekdaysShort();
       let weekdaysLong = moment.weekdays();

       let weekdays = weekdaysShort.map(weekday => {
            return (
                <th key={weekday} scope="col" className="weekday text-center">
                    {weekday}
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
                <Day
                    dayNum={d}
                    currentDay={d == this.currentDay()}
                    modalVisibility={this.state.modalVisibility}
                    showModal={this.showModal}
                />
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
                <Modal 
                    show={this.state.modalVisibility} 
                    handleClose={this.hideModal} 
                    selectedDay={this.state.selectedDay} 
                    selectedWeekday={weekdaysLong[this.currentDayOfWeek()]}
                    selectedEvents={this.state.selectedEvents}
                />
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
