package com.zealthy.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String provider;

    private LocalDateTime datetime;

    private String repeat;

    private LocalDate repeatUntil;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}