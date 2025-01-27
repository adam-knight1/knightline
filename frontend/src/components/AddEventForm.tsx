import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const AddEventForm: React.FC<{ refreshEvents: () => void }> = ({ refreshEvents }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure the eventTime includes a timezone
        const formattedEventTime = new Date(eventTime).toISOString();

        const newEvent = { title, description, eventTime: formattedEventTime, location };

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            alert('No auth token found, please log in.');
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/calendar/create`, newEvent, { // Will update when deploying
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log('Event added:', response.data);
            refreshEvents(); // Call the function to refresh events
            // Optionally reset form fields here maybe
        } catch (error: unknown) {
            // Cast error to an Error object and access message
            if (error instanceof Error) {
                console.error("There was an error adding the event!", error);
                alert(`Error: ${error.message}`);
            } else {
                // In case the error is not an instance of Error, handle it accordingly
                console.error("An unknown error occurred", error);
                alert('An unknown error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
            <input type="datetime-local" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
            <button type="submit">Add Event</button>
        </form>
    );
};

export default AddEventForm;
