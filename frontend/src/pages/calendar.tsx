import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import CalendarComponent from '../components/CalendarComponent';
import AddEventForm from '../components/AddEventForm';
import styles from '../styles/Styles.css';

// Define the type for the ref (the component methods you want to expose)
interface CalendarComponentMethods {
  fetchEvents: () => void;
}

const CalendarPage = () => {
  // Use the type for the calendarRef
  const calendarRef = useRef<CalendarComponentMethods | null>(null);
  const router = useRouter();

  const refreshEvents = () => {
    if (calendarRef.current) {
      calendarRef.current.fetchEvents(); // Now TypeScript knows about fetchEvents, and also testing this.
    }
  };

  const handleBack = () => {
    router.push('/user-page'); // This will probably stay as is for now, unless I change the overall site configuration
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
