import React from 'react';
import CalendarComponent from '../components/CalendarComponent';
import AddEventForm from '../components/AddEventForm';

const CalendarPage = () => {
    return (
        <div>
            <h1>Family Calendar</h1>
            <CalendarComponent />
            <AddEventForm />
        </div>
    );
};

export default CalendarPage;
