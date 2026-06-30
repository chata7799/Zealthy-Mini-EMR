package com.zealthy.backend.controller;

import com.zealthy.backend.dto.request.PatientRequest;
import com.zealthy.backend.dto.response.PatientResponse;
import com.zealthy.backend.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * REST controller for managing patient operations
 * used by the Mini EMR admin interface.
 */
@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173","https://zealthy-mini-emr-app.onrender.com"})
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public List<PatientResponse> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public PatientResponse getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponse createPatient(@Valid @RequestBody PatientRequest request) {
        return patientService.createPatient(request);
    }

    @PutMapping("/{id}")
    public PatientResponse updatePatient(@PathVariable Long id,
                                         @Valid @RequestBody PatientRequest request) {
        return patientService.updatePatient(id, request);
    }

}