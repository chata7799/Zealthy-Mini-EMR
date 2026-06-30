package com.zealthy.backend.service;

import com.zealthy.backend.dto.request.PatientRequest;
import com.zealthy.backend.dto.response.PatientResponse;

import java.util.List;

public interface PatientService {

    List<PatientResponse> getAllPatients();

    PatientResponse getPatientById(Long id);

    PatientResponse createPatient(PatientRequest request);

    PatientResponse updatePatient(Long id, PatientRequest request);
}