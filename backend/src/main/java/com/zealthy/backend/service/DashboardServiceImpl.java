package com.zealthy.backend.service;

import com.zealthy.backend.dto.response.AppointmentResponse;
import com.zealthy.backend.dto.response.DashboardResponse;
import com.zealthy.backend.dto.response.PrescriptionResponse;
import com.zealthy.backend.entity.Patient;
import com.zealthy.backend.exception.ResourceNotFoundException;
import com.zealthy.backend.mapper.AppointmentMapper;
import com.zealthy.backend.mapper.PrescriptionMapper;
import com.zealthy.backend.repository.AppointmentRepository;
import com.zealthy.backend.repository.PatientRepository;
import com.zealthy.backend.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final PrescriptionRepository prescriptionRepository;

    @Override
    public DashboardResponse getDashboard(Long patientId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        LocalDateTime today = LocalDateTime.now();
        LocalDateTime nextWeek = today.plusDays(7);

        LocalDate todayDate = LocalDate.now();
        LocalDate nextWeekDate = todayDate.plusDays(7);

        List<AppointmentResponse> appointments =
                appointmentRepository
                        .findByPatientIdAndDatetimeBetween(
                                patientId,
                                today,
                                nextWeek)
                        .stream()
                        .map(AppointmentMapper::toResponse)
                        .toList();

        List<PrescriptionResponse> prescriptions =
                prescriptionRepository
                        .findByPatientIdAndRefillOnBetween(
                                patientId,
                                todayDate,
                                nextWeekDate)
                        .stream()
                        .map(PrescriptionMapper::toResponse)
                        .toList();

        return DashboardResponse.builder()
                .patientId(patient.getId())
                .patientName(patient.getName())
                .email(patient.getEmail())
                .upcomingAppointments(appointments)
                .upcomingRefills(prescriptions)
                .build();
    }
}