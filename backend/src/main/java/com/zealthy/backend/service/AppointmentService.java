package com.zealthy.backend.service;

import com.zealthy.backend.dto.request.AppointmentRequest;
import com.zealthy.backend.dto.response.AppointmentResponse;

import java.util.List;

public interface AppointmentService {

    List<AppointmentResponse> getAppointmentsByPatient(Long patientId);

    AppointmentResponse createAppointment(Long patientId,
                                          AppointmentRequest request);

    AppointmentResponse updateAppointment(Long appointmentId,
                                          AppointmentRequest request);

    void deleteAppointment(Long appointmentId);

}