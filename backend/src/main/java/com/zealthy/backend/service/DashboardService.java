package com.zealthy.backend.service;

import com.zealthy.backend.dto.response.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboard(Long patientId);

}