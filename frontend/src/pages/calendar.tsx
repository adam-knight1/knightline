import React from 'react';
import CalendarComponent from '../components/CalendarComponent';
import AddEventForm from '../components/AddEventForm';

const CalendarPage = () => {
    const calendarRef = React.createRef();

    const refreshEvents = () => {
        if (calendarRef.current) {
            calendarRef.current.fetchEvents();
        }
    };

    return (
        <div>
            <h1>Family Calendar</h1>
            <CalendarComponent ref={calendarRef} />
            <AddEventForm refreshEvents={refreshEvents} />
        </div>
    );
};

export default CalendarPage;
