import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const CalendarComponent = forwardRef((props, ref) => {
    const [events, setEvents] = useState([]);
    CalendarComponent.displayName = "CalendarComponent";

    const fetchEvents = useCallback(async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            alert('No auth token found, please log in.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/calendar/events', { //local placeholder
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const fetchedEvents = response.data.map(event => {
                console.log('Raw eventTime:', event.eventTime); // Logging raw eventTime

                // Converting eventTime to a valid Date object
                const eventTime = new Date(event.eventTime);
                if (isNaN(eventTime.getTime())) {
                    console.error('Invalid eventTime format:', event.eventTime);
                    return null; // Skip invalid dates
                }

                return {
                    id: event.id,
                    title: event.title,
                    start: eventTime.toISOString(), // Ensuring correct format
                    description: event.description,
                    location: event.location,
                };
            }).filter(event => event !== null); // Filter out invalid events

            console.log('Formatted events:', fetchedEvents); // Logging formatted events

            setEvents(fetchedEvents);
        } catch (error) {
            console.error("There was an error fetching the events!", error);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        fetchEvents
    }));

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleEventClick = (info) => {
        alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}\nLocation: ${info.event.extendedProps.location}`);
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
        />
    );
});

export default CalendarComponent;
