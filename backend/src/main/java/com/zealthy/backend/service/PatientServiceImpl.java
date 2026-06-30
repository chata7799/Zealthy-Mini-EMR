package com.zealthy.backend.service;

import com.zealthy.backend.dto.request.PatientRequest;
import com.zealthy.backend.dto.response.PatientResponse;
import com.zealthy.backend.entity.Patient;
import com.zealthy.backend.exception.ResourceNotFoundException;
import com.zealthy.backend.mapper.PatientMapper;
import com.zealthy.backend.repository.PatientRepository;
import com.zealthy.backend.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;

    /**
     * Returns all patients for the admin dashboard.
     */
    @Override
    public List<PatientResponse> getAllPatients() {

        return patientRepository.findAll()
                .stream()
                .map(PatientMapper::toResponse)
                .toList();
    }

    @Override
    public PatientResponse getPatientById(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id : " + id));

        return PatientMapper.toResponse(patient);
    }

    @Override
    public PatientResponse createPatient(PatientRequest request) {

        Patient patient = PatientMapper.toEntity(request);

        Patient savedPatient = patientRepository.save(patient);

        return PatientMapper.toResponse(savedPatient);
    }

    @Override
    public PatientResponse updatePatient(Long id, PatientRequest request) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id : " + id));

        patient.setName(request.getName());
        patient.setEmail(request.getEmail());
        patient.setPassword(request.getPassword());

        Patient updatedPatient = patientRepository.save(patient);

        return PatientMapper.toResponse(updatedPatient);
    }
}