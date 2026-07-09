package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ResumeResponse;
import com.aakash.portfolio.cms.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin/resumes")
@RequiredArgsConstructor
public class AdminResumeController {

    private final ResumeService resumeService;

    // ==========================
    // GET ALL RESUMES
    // ==========================
    @GetMapping
    public ResponseEntity<ApiResponse> getAllResumes() {

        List<ResumeResponse> resumes = resumeService.getAllResumes();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Resumes fetched successfully")
                        .data(resumes)
                        .build()
        );
    }

    // ==========================
    // UPLOAD RESUME PDF
    // ==========================
    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse> uploadResume(
            @RequestPart("file") MultipartFile file
    ) {

        ResumeResponse response = resumeService.uploadResume(file);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Resume uploaded successfully")
                        .data(response)
                        .build()
        );
    }

    // ==========================
    // DELETE RESUME
    // ==========================
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteResume(@PathVariable Long id) {

        resumeService.deleteResume(id);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Resume deleted successfully")
                        .build()
        );
    }
}