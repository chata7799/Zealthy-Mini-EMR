package com.zealthy.backend.service;

import com.zealthy.backend.dto.request.LoginRequest;
import com.zealthy.backend.dto.response.LoginResponse;
import com.zealthy.backend.entity.Patient;
import com.zealthy.backend.exception.InvalidCredentialsException;
import com.zealthy.backend.repository.PatientRepository;
import com.zealthy.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final PatientRepository patientRepository;

    @Override
    public LoginResponse login(LoginRequest request) {

        Patient patient = patientRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password"));

        if (!patient.getPassword().equals(request.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return LoginResponse.builder()
                .id(patient.getId())
                .name(patient.getName())
                .email(patient.getEmail())
                .build();
    }
}