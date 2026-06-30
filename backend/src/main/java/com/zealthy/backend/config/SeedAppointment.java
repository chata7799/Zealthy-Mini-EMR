package com.zealthy.backend.config;

import lombok.Data;

@Data
public class SeedAppointment {

    private Long id;

    private String provider;

    private String datetime;

    private String repeat;

}