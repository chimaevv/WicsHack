package com.hiddengem.eventservice.repositories;

import com.hiddengem.eventservice.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // ✅ Query to filter events by date, location, and type
    @Query("SELECT * FROM events e WHERE e.event_date = :date AND e.location = :location --AND e.type = :type")
    List<Event> findEventsByFilters(LocalDate date, String location, String type);
}
