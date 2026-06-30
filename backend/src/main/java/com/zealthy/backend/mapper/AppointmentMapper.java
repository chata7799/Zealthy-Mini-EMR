package com.zealthy.backend.mapper;

import com.zealthy.backend.dto.request.AppointmentRequest;
import com.zealthy.backend.dto.response.AppointmentResponse;
import com.zealthy.backend.entity.Appointment;

public class AppointmentMapper {

    public static Appointment toEntity(AppointmentRequest request) {

        return Appointment.builder()
                .provider(request.getProvider())
                .datetime(request.getDatetime())
                .repeat(request.getRepeat())
                .repeatUntil(request.getRepeatUntil())
                .build();
    }

    public static AppointmentResponse toResponse(Appointment appointment) {

        return AppointmentResponse.builder()
                .id(appointment.getId())
                .provider(appointment.getProvider())
                .datetime(appointment.getDatetime())
                .repeat(appointment.getRepeat())
                .repeatUntil(appointment.getRepeatUntil())
                .build();
    }

}