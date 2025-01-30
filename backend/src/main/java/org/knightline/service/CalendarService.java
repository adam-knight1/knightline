// See the LICENSE file in the root of the repository for license details.
package org.knightline.service;

import org.knightline.repository.CalendarEventRepository;
import org.knightline.repository.entity.CalendarEvent;
import org.knightline.repository.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class CalendarService {

    private final CalendarEventRepository calendarEventRepository;

    @Autowired
    public CalendarService (CalendarEventRepository calendarEventRepository) {
        this.calendarEventRepository = calendarEventRepository;
    }

    /**
     * Creates a new calendar event with the specified details and associates it with a user.
     *
     * @param user the user to associate with the event
     * @param title the title of the event
     * @param description the description of the event
     * @param eventTime the time the event is scheduled to occur
     * @return the created CalendarEvent
     * @throws DataAccessException if there is a problem during database access
     */

    @Transactional
    public CalendarEvent createCalendarEvent(User user, String title, String description, String eventTime) {
        ZonedDateTime zonedEventTime;
        try {
            zonedEventTime = ZonedDateTime.parse(eventTime);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Invalid date format for eventTime", e);
        }

        CalendarEvent calendarEvent = new CalendarEvent();
        calendarEvent.setCreatedAt(ZonedDateTime.now());
        calendarEvent.setUser(user);
        calendarEvent.setDescription(description);
        calendarEvent.setTitle(title);
        calendarEvent.setEventTime(zonedEventTime);

        try {
            return calendarEventRepository.save(calendarEvent);
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Failed to save the calendar event due to data integrity issues.", ex);
        }
    }


    public List<CalendarEvent> getAllEvents() {
        return calendarEventRepository.findAll();
    }
}
