import "./Modal.css"

const Modal = ({ show, handleClose, selectedDay, selectedWeekday, selectedEvents }) => {
    const visibilityClass = show ? "display-block" : "display-none";

    function timeText(hour) {
        let ampm = hour < 12 ? "am" : "pm";
        let timeNum = (hour % 12 == 0) ? 12 : hour % 12;
        return timeNum + ampm
    }
             

    let calendarBlocks = [];

    for (let i = 0; i < 24; i++) {
        // TODO: if (event takes place durnig this time) {
        //     incldue it in the div
        // }

        calendarBlocks.push(
            <div className="time-row"><span>{timeText(i)}</span><hr/></div>
        )
    }

    return (
        <>
            <div className={`modal ${visibilityClass}`}>
                <section className="p-4 modal-main">
                    <h3>{selectedDay}</h3>
                    <h6>{selectedWeekday}</h6>
                    {calendarBlocks}
                    {selectedEvents}
                    <button type="button" onClick={handleClose}>
                        Close
                    </button>
                </section>
            </div>
        </>
    );
}

export default Modal;