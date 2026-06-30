package com.zealthy.backend.repository;

import com.zealthy.backend.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long>{

    List<Prescription> findByPatientId(Long patientId);
    List<Prescription> findByPatientIdAndRefillOnBetween(
            Long patientId,
            LocalDate start,
            LocalDate end);

}