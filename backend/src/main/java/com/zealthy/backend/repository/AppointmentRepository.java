package com.zealthy.backend.repository;

import com.zealthy.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByPatientIdAndDatetimeBetween(
            Long patientId,
            LocalDateTime start,
            LocalDateTime end);
}