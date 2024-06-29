import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/events')
            .then(response => {
                const fetchedEvents = response.data.map(event => ({
                    title: event.title,
                    start: event.eventTime,
                    description: event.description,
                    location: event.location
                }));
                setEvents(fetchedEvents);
            })
            .catch(error => {
                console.error("There was an error fetching the events!", error);
            });
    }, []);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={events}
        />
    );
};

export default CalendarComponent;
