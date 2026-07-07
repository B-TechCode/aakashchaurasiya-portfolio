package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.ContactMessageRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ContactMessageResponse;
import com.aakash.portfolio.cms.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse> submitContactMessage(@Valid @RequestBody ContactMessageRequest request) {
        ContactMessageResponse response = contactService.submitContactMessage(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.builder()
                        .success(true)
                        .message("Contact message submitted successfully")
                        .data(response)
                        .build());
    }
}
