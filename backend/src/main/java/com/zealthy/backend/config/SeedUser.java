package com.zealthy.backend.config;

import lombok.Data;

import java.util.List;

@Data
public class SeedUser {

    private Long id;

    private String name;

    private String email;

    private String password;

    private List<SeedAppointment> appointments;

    private List<SeedPrescription> prescriptions;

}