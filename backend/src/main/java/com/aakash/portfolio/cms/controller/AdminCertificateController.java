package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.CertificateRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.CertificateResponse;
import com.aakash.portfolio.cms.service.CertificateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/certificates")
@RequiredArgsConstructor
public class AdminCertificateController {

    private final CertificateService certificateService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCertificates() {
        List<CertificateResponse> certificates = certificateService.getAllCertificates();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Certificates fetched successfully").data(certificates).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCertificateById(@PathVariable Long id) {
        CertificateResponse certificate = certificateService.getCertificateById(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Certificate fetched successfully").data(certificate).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createCertificate(@Valid @RequestBody CertificateRequest request) {
        CertificateResponse certificate = certificateService.createCertificate(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.builder().success(true).message("Certificate created successfully").data(certificate).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCertificate(@PathVariable Long id, @Valid @RequestBody CertificateRequest request) {
        CertificateResponse certificate = certificateService.updateCertificate(id, request);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Certificate updated successfully").data(certificate).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCertificate(@PathVariable Long id) {
        certificateService.deleteCertificate(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Certificate deleted successfully").build());
    }
}
