package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.UpdateAccountRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/account")
@RequiredArgsConstructor
public class AdminAccountController {

    private final AccountService accountService;

    @PutMapping
    public ResponseEntity<ApiResponse> updateAccount(
            @Valid @RequestBody UpdateAccountRequest request) {

        accountService.updateAccount(request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Account updated successfully.")
                        .build()
        );
    }
}