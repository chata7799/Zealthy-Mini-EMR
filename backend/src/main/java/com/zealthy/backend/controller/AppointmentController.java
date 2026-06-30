package com.zealthy.backend.controller;

import com.zealthy.backend.dto.request.AppointmentRequest;
import com.zealthy.backend.dto.response.AppointmentResponse;
import com.zealthy.backend.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing patient appointments.
 *
 * Provides CRUD operations for appointments used by both
 * the Mini EMR (Admin) and Patient Portal.
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173","https://zealthy-mini-emr-app.onrender.com"})
public class AppointmentController {

    /**
     * Service layer for appointment-related business logic.
     */
    private final AppointmentService appointmentService;

    /**
     * Retrieves all appointments for a specific patient.
     *
     * @param patientId ID of the patient
     * @return List of appointments belonging to the patient
     */
    @GetMapping("/patients/{patientId}/appointments")
    public List<AppointmentResponse> getAppointments(@PathVariable Long patientId) {

        return appointmentService.getAppointmentsByPatient(patientId);
    }

    /**
     * Creates a new appointment for the specified patient.
     *
     * @param patientId ID of the patient
     * @param request Appointment details
     * @return Newly created appointment
     */
    @PostMapping("/patients/{patientId}/appointments")
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentResponse createAppointment(
            @PathVariable Long patientId,
            @Valid @RequestBody AppointmentRequest request) {

        return appointmentService.createAppointment(patientId, request);
    }

    /**
     * Updates an existing appointment.
     *
     * @param appointmentId ID of the appointment to update
     * @param request Updated appointment information
     * @return Updated appointment details
     */
    @PutMapping("/appointments/{appointmentId}")
    public AppointmentResponse updateAppointment(
            @PathVariable Long appointmentId,
            @Valid @RequestBody AppointmentRequest request) {

        return appointmentService.updateAppointment(appointmentId, request);
    }

    /**
     * Deletes an appointment by its ID.
     *
     * @param appointmentId ID of the appointment to delete
     */
    @DeleteMapping("/appointments/{appointmentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppointment(@PathVariable Long appointmentId) {

        appointmentService.deleteAppointment(appointmentId);
    }
}