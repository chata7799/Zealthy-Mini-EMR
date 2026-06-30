package com.zealthy.backend.controller;

import com.zealthy.backend.dto.request.PrescriptionRequest;
import com.zealthy.backend.dto.response.PrescriptionResponse;
import com.zealthy.backend.service.PrescriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing patient prescriptions.
 *
 * Provides CRUD operations for prescriptions used by both
 * the Mini EMR (Admin) and Patient Portal.
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173","https://zealthy-mini-emr-app.onrender.com"})
public class PrescriptionController {

    /**
     * Service layer for prescription-related business logic.
     */
    private final PrescriptionService prescriptionService;

    /**
     * Retrieves all prescriptions for a specific patient.
     *
     * @param patientId ID of the patient
     * @return List of prescriptions belonging to the patient
     */
    @GetMapping("/patients/{patientId}/prescriptions")
    public List<PrescriptionResponse> getPrescriptions(
            @PathVariable Long patientId) {

        return prescriptionService.getPrescriptionsByPatient(patientId);
    }

    /**
     * Creates a new prescription for the specified patient.
     *
     * @param patientId ID of the patient
     * @param request Prescription details
     * @return Newly created prescription
     */
    @PostMapping("/patients/{patientId}/prescriptions")
    @ResponseStatus(HttpStatus.CREATED)
    public PrescriptionResponse createPrescription(
            @PathVariable Long patientId,
            @Valid @RequestBody PrescriptionRequest request) {

        return prescriptionService.createPrescription(patientId, request);
    }

    /**
     * Updates an existing prescription.
     *
     * @param prescriptionId ID of the prescription to update
     * @param request Updated prescription information
     * @return Updated prescription details
     */
    @PutMapping("/prescriptions/{prescriptionId}")
    public PrescriptionResponse updatePrescription(
            @PathVariable Long prescriptionId,
            @Valid @RequestBody PrescriptionRequest request) {

        return prescriptionService.updatePrescription(prescriptionId, request);
    }

    /**
     * Deletes a prescription by its ID.
     *
     * @param prescriptionId ID of the prescription to delete
     */
    @DeleteMapping("/prescriptions/{prescriptionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePrescription(
            @PathVariable Long prescriptionId) {

        prescriptionService.deletePrescription(prescriptionId);
    }
}