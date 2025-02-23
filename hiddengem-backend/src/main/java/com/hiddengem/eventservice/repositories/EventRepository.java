package com.hiddengem.eventservice.repositories;
import org.springframework.data.repository.query.Param;
import com.hiddengem.eventservice.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // ✅ Query to filter events by date, location, and type
    @Query("SELECT e FROM events e WHERE e.event_date = :date AND e.event_location = :location AND (:type IS NULL OR e.event_tag = :tag)")
    List<Event> findEventsByFilters(@Param("date") LocalDate date, @Param("location") String location, @Param("type") String tag);
}
