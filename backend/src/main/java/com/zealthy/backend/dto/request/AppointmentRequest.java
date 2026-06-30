package com.zealthy.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
public class AppointmentRequest {

    @NotBlank
    private String provider;

    @NotNull
    private LocalDateTime datetime;

    @NotBlank
    private String repeat;

    private LocalDate repeatUntil;
}