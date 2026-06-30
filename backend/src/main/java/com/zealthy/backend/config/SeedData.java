package com.zealthy.backend.config;

import lombok.Data;

import java.util.List;

@Data
public class SeedData {

    private List<SeedUser> users;

    private List<String> medications;

    private List<String> dosages;

}