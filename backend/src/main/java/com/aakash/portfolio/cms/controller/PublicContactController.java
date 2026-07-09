package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.ContactRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ContactResponse;
import com.aakash.portfolio.cms.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class PublicContactController {

    private final ContactMessageService contactMessageService;

    @PostMapping
    public ResponseEntity<ApiResponse> submitMessage(
            @Valid @RequestBody ContactRequest request) {

        ContactResponse response =
                contactMessageService.submitMessage(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.builder()
                        .success(true)
                        .message("Message sent successfully")
                        .data(response)
                        .build());
    }
}