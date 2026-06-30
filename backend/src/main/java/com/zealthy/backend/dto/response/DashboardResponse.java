package com.zealthy.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardResponse {

    private Long patientId;

    private String patientName;

    private String email;

    private List<AppointmentResponse> upcomingAppointments;

    private List<PrescriptionResponse> upcomingRefills;

}