import React, { useState } from 'react';
import axios from 'axios';

const AddEventForm = ({ refreshEvents }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
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
            const response = await axios.post('http://localhost:8080/calendar/create', newEvent, { //will update when deploying
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log('Event added:', response.data);
            refreshEvents(); // Call the function to refresh events
            // Optionally reset form fields here maybe
        } catch (error) {
            console.error("There was an error adding the event!", error);
            alert(`Error: ${error.message}`);
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
