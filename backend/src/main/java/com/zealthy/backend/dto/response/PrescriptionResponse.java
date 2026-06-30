package com.zealthy.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class PrescriptionResponse {

    private Long id;

    private String medication;

    private String dosage;

    private Integer quantity;

    private LocalDate refillOn;

    private String refillSchedule;
}