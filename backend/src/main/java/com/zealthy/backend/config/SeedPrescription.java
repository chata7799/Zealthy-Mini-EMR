package com.zealthy.backend.config;

import lombok.Data;

@Data
public class SeedPrescription {

    private Long id;

    private String medication;

    private String dosage;

    private Integer quantity;

    private String refill_on;

    private String refill_schedule;

}