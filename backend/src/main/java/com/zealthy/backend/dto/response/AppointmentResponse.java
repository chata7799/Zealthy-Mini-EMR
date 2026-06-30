package com.zealthy.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class AppointmentResponse {

    private Long id;

    private String provider;

    private LocalDateTime datetime;

    private String repeat;

    private LocalDate repeatUntil;
}