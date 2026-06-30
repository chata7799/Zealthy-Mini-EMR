package com.zealthy.backend.mapper;

import com.zealthy.backend.dto.request.PrescriptionRequest;
import com.zealthy.backend.dto.response.PrescriptionResponse;
import com.zealthy.backend.entity.Prescription;

public class PrescriptionMapper {

    public static Prescription toEntity(PrescriptionRequest request) {

        Prescription prescription = new Prescription();

        prescription.setMedication(request.getMedication());
        prescription.setDosage(request.getDosage());
        prescription.setQuantity(request.getQuantity());
        prescription.setRefillOn(request.getRefillOn());
        prescription.setRefillSchedule(request.getRefillSchedule());

        return prescription;
    }

    public static PrescriptionResponse toResponse(Prescription prescription) {

        return PrescriptionResponse.builder()
                .id(prescription.getId())
                .medication(prescription.getMedication())
                .dosage(prescription.getDosage())
                .quantity(prescription.getQuantity())
                .refillOn(prescription.getRefillOn())
                .refillSchedule(prescription.getRefillSchedule())
                .build();
    }
}