import "./Modal.css"

const Modal = ({ show, handleClose, selectedDay, selectedWeekday, selectedEvents }) => {
    const visibilityClass = show ? "display-block" : "display-none";

    function timeText(hour) {
        let ampm = hour < 12 ? "am" : "pm";
        let timeNum = (hour % 12 == 0) ? 12 : hour % 12;
        return timeNum + ampm
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
                <div className="event-column">
                    <hr className="my-0"/>
                    {currentEvent}
                </div>
            </>
        )
        calendarRows.push(timeRow);
    }

    return (
        <>
            <div className={`modal ${visibilityClass}`}>
                <section className="p-4 modal-main">
                    <h3>{selectedDay}</h3>
                    <h6>{selectedWeekday}</h6>
                    <div className="modal-scroll-box">
                        <div className="modal-calendar">
                            {calendarRows}
                        </div>
                    </div>
                    <button className="modal-button" type="button" onClick={handleClose}>
                        Close
                    </button>
                </section>
            </div>
        </>
    );
}

export default Modal;