package com.zealthy.backend.service;

import com.zealthy.backend.dto.request.PrescriptionRequest;
import com.zealthy.backend.dto.response.PrescriptionResponse;

import java.util.List;

public interface PrescriptionService {

    List<PrescriptionResponse> getPrescriptionsByPatient(Long patientId);

    PrescriptionResponse createPrescription(Long patientId,
                                            PrescriptionRequest request);

    PrescriptionResponse updatePrescription(Long prescriptionId,
                                            PrescriptionRequest request);

    void deletePrescription(Long prescriptionId);

}