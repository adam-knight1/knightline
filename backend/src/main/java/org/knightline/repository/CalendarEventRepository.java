package org.knightline.repository;

import org.knightline.repository.entity.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent,Long> {
}
