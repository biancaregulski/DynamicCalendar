import React, { Component, Fragment } from 'react';
import moment from 'moment';

class Calendar extends React.Component {
    state = {
        dateContext: moment(),
        selectedDay: null
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

    currentMonth = () => {
        return this.state.dateContext.format("MMMM");
    }

    render() {
        let weekdaysShort = moment.weekdaysShort();

       let weekdays = weekdaysShort.map(day => {
            return (
                <th key={day} scope="col" className="weekday">
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
                <td key={d} className={`calendar-day ${(d == this.currentDay() ? "table-primary" : "")}`}>
                    {d}
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

        let trElems = rows.map((d, i) => {
            return ( 
                <tr className="weekday-rows" key={i}>
                    {d}
                </tr>
            )
        });

        return (
            <div>
                <h3 className="text-center">{this.currentMonth()}</h3>
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
        );
    }
}

export default Calendar;
