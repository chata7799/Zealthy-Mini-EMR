package com.zealthy.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PrescriptionRequest {

    @NotBlank
    private String medication;

    @NotBlank
    private String dosage;

    @NotNull
    private Integer quantity;

    @NotNull
    private LocalDate refillOn;

    @NotBlank
    private String refillSchedule;
}