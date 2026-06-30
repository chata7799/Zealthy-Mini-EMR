package com.zealthy.backend.service;

import com.zealthy.backend.dto.request.AppointmentRequest;
import com.zealthy.backend.dto.response.AppointmentResponse;
import com.zealthy.backend.entity.Appointment;
import com.zealthy.backend.entity.Patient;
import com.zealthy.backend.exception.ResourceNotFoundException;
import com.zealthy.backend.mapper.AppointmentMapper;
import com.zealthy.backend.repository.AppointmentRepository;
import com.zealthy.backend.repository.PatientRepository;
import com.zealthy.backend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;

    @Override
    public List<AppointmentResponse> getAppointmentsByPatient(Long patientId) {

        return appointmentRepository.findByPatientId(patientId)
                .stream()
                .map(AppointmentMapper::toResponse)
                .toList();
    }

    @Override
    public AppointmentResponse createAppointment(Long patientId,
                                                 AppointmentRequest request) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id : " + patientId));

        Appointment appointment = AppointmentMapper.toEntity(request);
        appointment.setPatient(patient);

        Appointment savedAppointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toResponse(savedAppointment);
    }

    @Override
    public AppointmentResponse updateAppointment(Long appointmentId,
                                                 AppointmentRequest request) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Appointment not found with id : " + appointmentId));

        appointment.setProvider(request.getProvider());
        appointment.setDatetime(request.getDatetime());
        appointment.setRepeat(request.getRepeat());
        appointment.setRepeatUntil(request.getRepeatUntil());

        Appointment updatedAppointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toResponse(updatedAppointment);
    }

    @Override
    public void deleteAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Appointment not found with id : " + appointmentId));

        appointmentRepository.delete(appointment);
    }
}