package com.zealthy.backend.service;

import com.zealthy.backend.dto.request.PrescriptionRequest;
import com.zealthy.backend.dto.response.PrescriptionResponse;
import com.zealthy.backend.entity.Patient;
import com.zealthy.backend.entity.Prescription;
import com.zealthy.backend.exception.ResourceNotFoundException;
import com.zealthy.backend.mapper.PrescriptionMapper;
import com.zealthy.backend.repository.PatientRepository;
import com.zealthy.backend.repository.PrescriptionRepository;
import com.zealthy.backend.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;

    @Override
    public List<PrescriptionResponse> getPrescriptionsByPatient(Long patientId) {

        return prescriptionRepository.findByPatientId(patientId)
                .stream()
                .map(PrescriptionMapper::toResponse)
                .toList();
    }

    @Override
    public PrescriptionResponse createPrescription(Long patientId,
                                                   PrescriptionRequest request) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found with id : " + patientId));

        Prescription prescription = PrescriptionMapper.toEntity(request);
        prescription.setPatient(patient);

        Prescription savedPrescription = prescriptionRepository.save(prescription);

        return PrescriptionMapper.toResponse(savedPrescription);
    }

    @Override
    public PrescriptionResponse updatePrescription(Long prescriptionId,
                                                   PrescriptionRequest request) {

        Prescription prescription = prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Prescription not found with id : " + prescriptionId));

        prescription.setMedication(request.getMedication());
        prescription.setDosage(request.getDosage());
        prescription.setQuantity(request.getQuantity());
        prescription.setRefillOn(request.getRefillOn());
        prescription.setRefillSchedule(request.getRefillSchedule());

        Prescription updatedPrescription = prescriptionRepository.save(prescription);

        return PrescriptionMapper.toResponse(updatedPrescription);
    }

    @Override
    public void deletePrescription(Long prescriptionId) {

        Prescription prescription = prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Prescription not found with id : " + prescriptionId));

        prescriptionRepository.delete(prescription);
    }
}