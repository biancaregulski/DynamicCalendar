import "./Modal.css"
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';

const IndexEventsModal = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const closeModal = e => {
        e.stopPropagation();
        navigate(-1);
    };
    
    const {
        selectedDay,
        selectedWeekday,
        selectedEvents
    } = location.state || {}

    const { day, month, year } = useParams();

    function timeText(hour) {
        let ampm = hour < 12 ? "am" : "pm";
        let time = (hour % 12 == 0) ? 12 : hour % 12;
        return time + ampm
    }

    let calendarBlocks = [];
    let calendarRows = [];

    let lastTimeEnd = null;
    let lastEvent = null;
    let currentEvent = null;
    for (let i = 0; i < 24; i++) {
        currentEvent = null;
        if (lastTimeEnd > i) {
            currentEvent = lastEvent;
        }
        else {
            currentEvent = selectedEvents.find(ev => {
                // check if event's start hour matches the displayed hour
                if (ev.props.hourStart === i) {
                    lastTimeEnd = ev.props.hourEnd;
                    lastEvent = ev;
                    return ev;
                }
            })
        }


        var timeRow = (
            <>
                <div className="mr-5 time-column">{timeText(i)}</div>
                <div 
                    className="event-column"
                    onClick={() => navigate(
                        `/add/d/${day}/m/${month}/y/${year}`,
                        { state: { 
                            previousLocation: location,
                            startHour: i,
                            startMinute: 0,
                            endHour: i + 1,
                            endMinute: 0
                        }})
                    }>
                    <hr className="my-0"/>
                    {currentEvent}
                </div>
            </>
        )
        calendarRows.push(timeRow);
    }

    return (
        <div className="modal display-block">
            <div
                className="modal display-block"
                onClick={e => e.stopPropagation()}
            >
                
                <section className="p-4 modal-main">
                    <div className="modal-top">
                        {/* <div> */}
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h3>{day}</h3>
                                    <h6>{selectedWeekday}</h6>
                                </div>
                            <div/>
                            </div>
                                <div className="x-btn-div">
                                    <span className="btn-close" data-dismiss="modal" aria-label="Close" onClick={closeModal}/>
                                </div>
                        {/* </div> */}
                    </div>
                    <div className="modal-scroll-box">
                        <div className="modal-calendar">
                            {calendarRows}
                        </div>
                    </div>
                    <div className="text-center">
                        <button 
                            className="top-button m-1 p-1"
                            onClick={() => navigate(
                                `/add/d/${day}/m/${month}/y/${year}`,
                                { state: { 
                                    previousLocation: location,
                                    startHour: 14,
                                    startMinute: 0,
                                    endHour: 16,
                                    endMinute: 30
                                }}
                        )} >Add Event</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default IndexEventsModal;