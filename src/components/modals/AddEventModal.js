import "./Modal.css"
import moment from 'moment';
import EventForm from "../EventForm.js"
import { useNavigate, useLocation } from 'react-router-dom';

const AddEventModal = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const closeModal = e => {
        e.stopPropagation();
        navigate(-1);
    };
    
    const {
        selectedDay = 1,
        startAttributes = {},
        endAttributes = {}
    } = location.state || {}
    
    function addEvent(eventData) {
        // console.log(eventData);
        // console.log(eventData.title);
        // console.log(eventData.start_time.toISOString());

        // fetch('/events', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         title: eventData.title,
        //         notes: eventData.notes,
        //         time_start_str: eventData.start_time.toISOString(),
        //         time_end_str: eventData.end_time.toISOString(),
        //         precedence_num: 1
        //     }),
        //     headers: {
        //       'Content-type': 'application/json; charset=UTF-8',
        //     },
        //   })
        //      .then((response) => response.json())
        //      .then((data) => {
        //         alert(data['status']);
        //         console.log(data);
        //         // Handle data
        //      })
        //      .catch((err) => {
        //         console.log(err.message);
        //      });

    }

    
    function selectedStartTime() {
        console.log(startAttributes)
        return moment({ 
            year: startAttributes['year'],
            month: startAttributes['month'],
            day: startAttributes['day'],
            hour: startAttributes['hour'],
            minute: startAttributes['minute'],
        });
    }
    
    function selectedEndTime() {
        return moment({ 
            year: endAttributes['year'],
            month: endAttributes['month'],
            day: endAttributes['day'],
            hour: endAttributes['hour'],
            minute: endAttributes['minute'],
        });
    }

    return (
        <div className={`modal display-block`}>
            <div
                className="modal display-block"
                onClick={e => e.stopPropagation()}
            >
                <section className="p-4 modal-main">
                    <div className="modal-top">
                        <div/>
                        <div className="title-div">
                            <h3 className="modal-title">Add Event</h3>
                        </div>
                        <div className="x-btn-div">
                            <span className="btn-close" data-dismiss="modal" aria-label="Close" onClick={closeModal}/>
                        </div>
                    </div>
                    {/* <div>
                        <h3 className="text-center mb-3">Add Event</h3>
                        <div className="btn-close position-absolute end-5" onClick={closeModal}></div>
                    </div> */}
                    <EventForm 
                        addEvent={addEvent}
                        selectedDay={selectedDay}
                        defaultStartTime={selectedStartTime()}
                        defaultEndTime={selectedEndTime()}
                    />
                    {/* <span  className="modal-button" type="button" onClick={handleClose}>
                        Close
                    </span> */}
                </section>
            </div>
        </div>
    );
}

export default AddEventModal;