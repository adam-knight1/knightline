package org.knightline.controller;

import org.knightline.dto.FamilyUpdateDto;
import org.knightline.repository.entity.CalendarEvent;
import org.knightline.repository.entity.FamilyUpdate;
import org.knightline.repository.entity.User;
import org.knightline.service.CalendarService;
import org.knightline.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/calendar")
public class CalendarController {

    private final CalendarService calendarService;
    private final UserService userService;

    public CalendarController(CalendarService calendarService, UserService userService) {
        this.calendarService = calendarService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<CalendarEvent> createEvent(@RequestBody CalendarEvent calendarEvent, Principal principal) {
        User user = userService.findUserByEmail(principal.getName());

        CalendarEvent newEvent = calendarService.createCalendarEvent(user, calendarEvent.getTitle(), calendarEvent.getDescription(), calendarEvent.getEventTime());

        return ResponseEntity.ok(newEvent);
    }
}
