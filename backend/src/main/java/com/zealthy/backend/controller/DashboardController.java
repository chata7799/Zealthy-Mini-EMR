package com.zealthy.backend.controller;

import com.zealthy.backend.dto.response.DashboardResponse;
import com.zealthy.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/{patientId}")
    public DashboardResponse getDashboard(
            @PathVariable Long patientId) {

        return dashboardService.getDashboard(patientId);
    }
}