package com.zealthy.backend.mapper;

import com.zealthy.backend.dto.request.PatientRequest;
import com.zealthy.backend.dto.response.PatientResponse;
import com.zealthy.backend.entity.Patient;

public class PatientMapper {

    public static Patient toEntity(PatientRequest request) {

        return Patient.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
    }

    public static PatientResponse toResponse(Patient patient) {

        return PatientResponse.builder()
                .id(patient.getId())
                .name(patient.getName())
                .email(patient.getEmail())
                .build();
    }
}