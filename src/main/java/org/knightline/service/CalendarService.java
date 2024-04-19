package org.knightline.service;

import org.knightline.repository.CalendarEventRepository;
import org.knightline.repository.entity.CalendarEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Service
public class CalendarService {

    private final CalendarEventRepository calendarEventRepository;

    @Autowired
    public CalendarService (CalendarEventRepository calendarEventRepository) {
        this.calendarEventRepository = calendarEventRepository;
    }

    @Transactional
    public CalendarEvent createCalendarEvent() {
        CalendarEvent calendarEvent = new CalendarEvent();
        calendarEvent.setCreatedAt(ZonedDateTime.now());


    }
}
