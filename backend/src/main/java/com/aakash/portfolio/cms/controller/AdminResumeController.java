package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.ResumeUploadRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ResumeResponse;
import com.aakash.portfolio.cms.service.ResumeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/resumes")
@RequiredArgsConstructor
public class AdminResumeController {

    private final ResumeService resumeService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllResumes() {
        List<ResumeResponse> resumes = resumeService.getAllResumes();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Resumes fetched successfully").data(resumes).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> uploadResume(@Valid @RequestBody ResumeUploadRequest request) {
        ResumeResponse resume = resumeService.uploadResume(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.builder().success(true).message("Resume uploaded successfully").data(resume).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Resume deleted successfully").build());
    }
}
