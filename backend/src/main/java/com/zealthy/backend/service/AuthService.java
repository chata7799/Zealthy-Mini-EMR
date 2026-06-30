package com.zealthy.backend.service;

import com.zealthy.backend.dto.request.LoginRequest;
import com.zealthy.backend.dto.response.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}