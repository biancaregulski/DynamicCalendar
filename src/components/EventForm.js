import React from 'react'
import PropTypes from 'prop-types';
import "rc-datetime-picker/dist/picker.css";
import {DatetimePicker, DatetimePickerTrigger} from 'rc-datetime-picker';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const EventForm = (props) => {
    const [form, setForm] = React.useState({
        title: '',
        notes: '',
        start_time: props.defaultStartTime,
        end_time: props.defaultEndTime,
        precedence: 'low'
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addEvent(form)
        props.handleClose()
    }

    const handleDateChange = (date) => {
        setForm({ 
            start_time: date,
            end_time: date
        })
    }

    console.log(props)
    return(
        <div className="px-5">
            <form onSubmit={handleSubmit}>
                <div className='form-group row mb-2'>
                    <label className='col-sm-3'>Title:</label>
                    <div className='col-sm-9'>
                        <input className='w-100' name='title' type="text" value={form.title} onChange={handleChange} />
                    </div>
                </div>
                <div className='form-group row mb-2'>
                    <label className='col-sm-3'>Notes:</label>
                    <div className='col-sm-9'>
                        <textarea className='w-100' name='notes' type="text" placeholder='Optional' value={form.notes} onChange={handleChange} />
                    </div>
                </div>
                
                <LocalizationProvider locale={moment.locale('de')} dateAdapter={AdapterMoment}>
                    <div className='form-group row mb-2'>
                        <label className='col-sm-3'>Start time:</label>
                        <div className='col-sm-9'>
                            <div>
                                <DateTimePicker
                                    name='start_time'
                                    defaultValue = {form.start_time}
                                    onChange = {(newDate) => handleDateChange(newDate)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='form-group row mb-2'>
                        <label className='col-sm-3'>End time:</label>
                        <div className='col-sm-9'>
                            <div>
                                <DateTimePicker
                                    name='end_time'
                                    defaultValue = {form.end_time}
                                    onChange = {(newDate) => handleDateChange(newDate)}
                                />
                            </div>
                        </div>
                    </div>
                </LocalizationProvider>
                {/* <div className='form-group row mb-2'>
                    <label className='col-sm-3'>Start Time:</label>
                    <div className='col-sm-9'>   
                        <DatetimePickerTrigger
                            moment={moment()}
                            className="datetime-picker"
                            onChange={handleChange}
                            showCalendarPicker={false}>
                            <input type="text" value={moment().format('YYYY-MM-DD HH:mm')} readOnly />
                        </DatetimePickerTrigger>
                    </div>
                </div>
                <div className='form-group row mb-2'>
                    <label className='col-sm-3'>End Time:</label>
                    <div className='col-sm-9'>
                        <DatetimePicker className='w-100' name='end_time' value={form.end_time} onChange={handleChange} />
                    </div>
                </div> */}
                <div className='form-group row mb-2'>
                    <label className='col-sm-3'>Precedence:</label>
                    <div className='col-sm-9 d-flex justify-content-between'>
                        <div>
                            <input type="radio" name="precedence" value="low" checked={form.precedence === 'low'} onChange={handleChange} />
                            <span className='ms-1'>Low</span>
                        </div>
                        <div>
                            <input type="radio" name="precedence" value="medium" checked={form.precedence === 'medium'} onChange={handleChange} />
                            <span className='ms-1'>Medium</span>
                        </div>
                        <div>
                            <input type="radio" name="precedence" value="high" checked={form.precedence === 'high'} onChange={handleChange} />
                            <span className='ms-1'>High</span>
                        </div>
                    </div>
                </div>
                 <div className="text-center">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

EventForm.propTypes = {
    addEvent: PropTypes.func.isRequired
};

export default EventForm;