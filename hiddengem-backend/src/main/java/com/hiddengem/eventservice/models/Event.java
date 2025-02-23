package com.hiddengem.eventservice.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "event_id")  // Maps to event_id in the database
    private Long id;

    @Column(name = "event_name")  // Matches event_name column
    private String name;

    @Column(name = "event_date")  // Matches event_date column
    private LocalDate date;

    @Column(name = "event_start_time")  // Matches event_start_time column
    private LocalTime startTime;

    @Column(name = "event_description")  // Matches event_description column
    private String description;

    @Column(name = "event_link")  // Matches event_link column
    private String link;

    @Column(name = "event_location")  // Matches event_location column
    private String location;

    @Column(name = "event_latitude")  // Matches event_latitude column
    private Float latitude;

    @Column(name = "event_longitude")  // Matches event_longitude column
    private Float longitude;

    @Column(name = "event_address")  // Matches event_address column
    private String address;

    @Column(name = "event_tag")  // Matches event_tag column
    private String tag;
}
