import React from 'react';
import moment from 'moment';
import Modal from './Modal.js'
import Day from './Day.js'
import Event from './Event.js'


class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            modalVisibility: false,
            dateContext: moment(),
            selectedDay: null,
            selectedEvents: [],
            calendarDays: []
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    setCalendarDays(daysArray = []) {
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td className="calendar-day table-secondary">{""}</td>
            );
        }

        if (daysArray.length === 0) {
            for (let d = 1; d <= this.daysInMonth(); d++) {
                daysArray.push(
                    <Day
                        key={d}
                        dayNum={d}
                        currentDay={d === this.currentDay()}
                        modalVisibility={this.state.modalVisibility}
                        showModal={this.showModal}
                        events={[]}
                    />
                )
            }
        }

        let totalSlots = [...blanks, ...daysArray];
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
        return rows.map((day, index) => {
            return ( 
                <tr className="weekday-rows" key={index}>
                    {day}
                </tr>
            )
        });
    }

    componentDidMount() {
        let daysArray = []
        fetch(`/events?month=${this.currentMonthInt()}&year=${this.currentYear()}`).then((res) =>
            res.json().then((data) => {
                for (let d = 1; d <= this.daysInMonth(); d++) {
                    // TODO: catch all parsing errors 
                    let eventsArray = data.filter(ev => parseInt(ev.day_start) === d).map(ev => {
                        return (
                            <Event
                                k={`${d}_${ev.hourStart}_${ev.minuteStart})`}
                                title={ev.title}
                                notes={ev.notes}
                                priority={ev.precedence}
                                hourStart={parseInt(ev.hour_start)}
                                minuteStart={parseInt(ev.minute_start)}
                                hourEnd={parseInt(ev.hour_end)}
                                minuteEnd={parseInt(ev.minute_end)}>
                            </Event>
                        )
                    })
                    daysArray.push(
                        <Day
                            key={d}
                            dayNum={d}
                            currentDay={d === this.currentDay()}
                            modalVisibility={this.state.modalVisibility}
                            showModal={this.showModal}
                            events={eventsArray}
                        />
                    )
                }
                
                this.setState({
                    calendarDays: this.setCalendarDays(daysArray)
                })   
            })
        );
    }

    showModal = (selectedDay, selectedEvents) => {
        
        console.log(selectedEvents);
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

    currentMonthStr = () => {
        return this.state.dateContext.format("MMMM");
    }

    currentMonthInt = () => {
        return this.state.dateContext.format('M');
    }

    currentYear = () => {
        return this.state.dateContext.format('Y');
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

        function addEvent() {
            alert("TBA");
        }

        this.setCalendarDays();

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
                        <h3 className="text-center">{this.currentMonthStr()}</h3>
                        <button className="top-button m-1 p-2">TBA</button>
                    </div>
                    <table className="table calendar-table">
                        <thead>
                            <tr>
                                {weekdays}
                            </tr>
                        </thead>
                        <tbody id="calendar-body">
                            {this.state.calendarDays}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Calendar;
