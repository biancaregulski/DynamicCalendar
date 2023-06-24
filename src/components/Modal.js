import "./Modal.css"

const Modal = ({ show, handleClose, selectedDay, selectedEvents }) => {
    const visibilityClass = show ? "display-block" : "display-none";
    return (
        <>
            <div className={`modal ${visibilityClass}`}>
                <section className="modal-main">
                    <p>{selectedDay}</p>
                    <button type="button" onClick={handleClose}>
                        Close
                    </button>
                </section>
            </div>
        </>
    );
}

export default Modal;