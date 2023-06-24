import "./Modal.css"

const Modal = ({ handleClose, show, children }) => {
    const visibilityClass = show ? "display-block" : "display-none";
    return (
        <div className={`modal ${visibilityClass}`}>
            <section className="modal-main">
                {children}
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
}

export default Modal;