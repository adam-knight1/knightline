// See the LICENSE file in the root of the repository for license details.
package org.knightline.controller;

import org.knightline.dto.CalendarEventDto;
import org.knightline.dto.UserDto;
import org.knightline.repository.entity.CalendarEvent;
import org.knightline.repository.entity.User;
import org.knightline.service.CalendarService;
import org.knightline.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<CalendarEventDto> createEvent(@RequestBody CalendarEventDto calendarEventDto, Principal principal) {
        User user = userService.findUserByEmail(principal.getName());
        UserDto userDto = new UserDto(user.getUserId(), user.getName(), user.getEmail(), user.getProfilePictureUrl());

        // Converting eventTime from String to ZonedDateTime
        CalendarEvent newEvent = calendarService.createCalendarEvent(
                user,
                calendarEventDto.getTitle(),
                calendarEventDto.getDescription(),
                calendarEventDto.getEventTime()  // Still a String here
        );

        // prepare the response DTO
        CalendarEventDto responseDto = new CalendarEventDto();
        responseDto.setId(newEvent.getId());
        responseDto.setTitle(newEvent.getTitle());
        responseDto.setDescription(newEvent.getDescription());
        responseDto.setEventTime(newEvent.getEventTime().toString());  // converting back to String in my current set ip
        responseDto.setUser(userDto);

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/events")
    public ResponseEntity<List<CalendarEventDto>> getAllEvents() {
        List<CalendarEvent> events = calendarService.getAllEvents();
        System.out.println("Fetched events: " + events.size()); // Logging number of events fetched
        List<CalendarEventDto> eventDtos = events.stream().map(event -> {
            CalendarEventDto dto = new CalendarEventDto();
            dto.setId(event.getId());
            dto.setTitle(event.getTitle());
            dto.setDescription(event.getDescription());
            dto.setEventTime(event.getEventTime().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));; // ISO 8601 format for calendar
            dto.setUser(new UserDto(event.getUser().getUserId(), event.getUser().getName(), event.getUser().getEmail(), event.getUser().getProfilePictureUrl()));
            return dto;
        }).collect(Collectors.toList());
        return new ResponseEntity<>(eventDtos, HttpStatus.OK);
    }
}

