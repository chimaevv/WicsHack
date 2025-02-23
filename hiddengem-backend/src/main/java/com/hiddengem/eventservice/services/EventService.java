package com.hiddengem.eventservice.services;

import com.hiddengem.eventservice.models.Event;
import com.hiddengem.eventservice.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getFilteredEvents(LocalDate date, String location, String tag) {
        if (date == null) {
            date = LocalDate.now();  // ✅ Default to today's date if not provided
        }
        if (location == null || location.isEmpty()) {
            location = "Charlottesville";  // ✅ Default to Charlottesville if not provided
        }
        return eventRepository.findEventsByFilters(date, location, tag);
    }
}