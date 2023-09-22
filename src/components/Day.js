import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Day = ({ location, dayNum, monthNum, yearNum, weekday, isCurrentDay, events }) => {
    const navigate = useNavigate();

    //  var events = [
    //      <Event title="Work" hourStart={9} minuteStart={0} hourEnd={17} minuteEnd={0} priority={"high"}></Event>,
    //      <Event title="Taekwondo Practice" hourStart={18} minuteStart={0} hourEnd={19} minuteEnd={0} priority={"low"}></Event>
    //  ]

    return(
                <td 
                    key={dayNum} 
                    className={`calendar-day ${(isCurrentDay ? "table-primary" : "")}`} 
                    onClick={() => navigate(
                        `/index/d/${dayNum}/m/${monthNum}/y/${yearNum}`,
                        { state: { 
                            previousLocation: location,
                            selectedWeekday: weekday,
                            selectedEvents: events
                        }}
                    )} >
                    {dayNum}
                    {events}
                </td>
    );
}

export default Day;