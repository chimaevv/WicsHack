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

    public List<Event> getFilteredEvents(LocalDate date, String location, String type) {
        return eventRepository.findEventsByFilters(date, location, type);
    }
}
