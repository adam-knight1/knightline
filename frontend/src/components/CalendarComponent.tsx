import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg } from '@fullcalendar/core';import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

interface Event {
  id: string;
  title: string;
  start: string;
  description: string;
  location: string;
}

interface CalendarComponentMethods {
  fetchEvents: () => void;
}

const CalendarComponent = forwardRef<CalendarComponentMethods>((props, ref) => {
  const [events, setEvents] = useState<Event[]>([]);

  // Forward the fetchEvents function to the parent component
  useImperativeHandle(ref, () => ({
    fetchEvents,
  }));

  // Fetch events from the backend
  const fetchEvents = useCallback(async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('No auth token found, please log in.');
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/calendar/events`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const fetchedEvents = response.data.map((event: any) => {
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
      }).filter((event: Event | null) => event !== null) as Event[]; // Filter out invalid events

      console.log('Formatted events:', fetchedEvents); // Logging formatted events

      setEvents(fetchedEvents);
    } catch (error) {
      console.error('There was an error fetching the events!', error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEventClick = (info: EventClickArg) => {
    alert(
      `Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}\nLocation: ${info.event.extendedProps.location}`
    );
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

CalendarComponent.displayName = 'CalendarComponent';

export default CalendarComponent;
