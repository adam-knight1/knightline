import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import CalendarComponent from '../components/CalendarComponent';
import AddEventForm from '../components/AddEventForm';
import styles from '../styles/Styles.css';

const CalendarPage = () => {
    const calendarRef = useRef();
    const router = useRouter();

    const refreshEvents = () => {
        if (calendarRef.current) {
            calendarRef.current.fetchEvents();
        }
    };

    const handleBack = () => {
        router.push('/user-page'); // Adjust the path as needed
    };

    return (
        <div>
            <h1>Family Calendar</h1>
            <button onClick={handleBack} style={{ marginBottom: '20px' }}>Back to Home</button>
            <CalendarComponent ref={calendarRef} />
            <AddEventForm refreshEvents={refreshEvents} />
        </div>
    );
};

export default CalendarPage;
