

package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.ServiceRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ServiceResponse;
import com.aakash.portfolio.cms.service.ServiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/services")
@RequiredArgsConstructor
public class AdminServiceController {

    private final ServiceService serviceService;

    // ==============================
    // GET ALL SERVICES
    // ==============================

    @GetMapping
    public ResponseEntity<ApiResponse> getAllServices() {

        List<ServiceResponse> services =
                serviceService.getAllServices();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Services fetched successfully")
                        .data(services)
                        .build()
        );
    }

    // ==============================
    // GET SERVICE BY ID
    // ==============================

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getServiceById(
            @PathVariable Long id) {

        ServiceResponse service =
                serviceService.getServiceById(id);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Service fetched successfully")
                        .data(service)
                        .build()
        );
    }

    // ==============================
    // CREATE SERVICE
    // ==============================

    @PostMapping
    public ResponseEntity<ApiResponse> createService(
            @Valid @RequestBody ServiceRequest request) {

        ServiceResponse service =
                serviceService.createService(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.builder()
                                .success(true)
                                .message("Service created successfully")
                                .data(service)
                                .build()
                );
    }

    // ==============================
    // UPDATE SERVICE
    // ==============================

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceRequest request) {

        ServiceResponse service =
                serviceService.updateService(id, request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Service updated successfully")
                        .data(service)
                        .build()
        );
    }

    // ==============================
    // DELETE SERVICE
    // ==============================

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteService(
            @PathVariable Long id) {

        serviceService.deleteService(id);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Service deleted successfully")
                        .build()
        );
    }
}