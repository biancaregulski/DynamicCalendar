import React from 'react';
import moment from 'moment';
import Day from './Day.js'
import Event from './Event.js'
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";

class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedDay: 1,
            modalOpen: null,
            dateContext: moment(),
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
                        location={this.props.location}
                        dayNum={d}
                        selectedWeekday={{}}
                        currentDay={d === this.currentDay()}
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

    dateAsString(date) {
        date.format('MMDDYYYYhhmm');
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

    // TODO: different params for different modals?
    showModal = (modalType, selectedDay, selectedEvents) => {
        console.log('showmodal - selectedDay')
        console.log(selectedDay)

        this.setState({ modalOpen: modalType, selectedDay: selectedDay, selectedEvents: selectedEvents });
    }

    hideModal = () => {
        this.setState({ modalOpen: null });
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
        return parseInt(this.state.dateContext.format('M'));
    }

    currentYear = () => {
        return parseInt(this.state.dateContext.format('Y'));
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

        this.setCalendarDays();

        return (
            <>
                {/* <IndexEventsModal
                    show={this.state.modalOpen === 'index_events'}
                    showModal={this.showModal}
                    handleClose={this.hideModal} 
                    selectedDay={this.state.selectedDay} 
                    selectedWeekday={weekdaysLong[this.currentDayOfWeek()]}
                    selectedEvents={this.state.selectedEvents}
                />
                <AddEventModal
                    show={this.state.modalOpen === 'add_event'}
                    addEvent={this.addEvent}
                    handleClose={this.hideModal}
                    selectedDay={this.state.selectedDay}
                    defaultStartTime={this.selectedStartTime()}
                    defaultEndTime={this.selectedEndTime()}
                /> */}
                <Outlet/>
                <div>
                    <div className='d-flex justify-content-between'>
                        <Link
                            className="button top-button m-1 p-2"
                            to={`/add/${this.state.selectedDay}`}
                            state={{ 
                                previousLocation: this.props.location,
                                show: this.state.modalOpen === 'add_event',
                                selectedDay: this.state.selectedDay,
                                startAttributes: { 
                                    year: this.currentYear(),
                                    month: this.currentMonthInt(),
                                    day: this.state.selectedDay,
                                    hour: 14,
                                    minute: 0
                                },
                                endAttributes: { 
                                    year: this.currentYear(),
                                    month: this.currentMonthInt(),
                                    day: this.state.selectedDay,
                                    hour: 15,
                                    minute: 0
                                },
                             }}
                            >
                            Open Modal
                        </Link>
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
