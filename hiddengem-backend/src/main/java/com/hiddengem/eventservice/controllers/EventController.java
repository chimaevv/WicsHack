package com.hiddengem.eventservice.controllers;

import com.hiddengem.eventservice.models.Event;
import com.hiddengem.eventservice.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // Allows frontend to access the API
public class EventController {

    @Autowired
    private EventService eventService;

    // ✅ Endpoint to fetch filtered events
    @GetMapping("/search")
    public List<Event> getFilteredEvents(
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false, defaultValue = "Charlottesville") String location,
            @RequestParam(required = false) String type) {

        // Default to today’s date if date is not provided
        if (date == null) {
            date = LocalDate.now();
        }

        return eventService.getFilteredEvents(date, location, type);
    }
}
