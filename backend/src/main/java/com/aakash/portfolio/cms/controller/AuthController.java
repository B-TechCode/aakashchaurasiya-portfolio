package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.LoginRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.OtpResponse;
import com.aakash.portfolio.cms.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aakash.portfolio.cms.dto.request.VerifyOtpRequest;
import com.aakash.portfolio.cms.dto.response.VerifyOtpResponse;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {

        OtpResponse response = authService.login(request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.builder()
                        .success(true)
                        .message("OTP sent successfully")
                        .data(response)
                        .build());
    }


   @PostMapping("/verify-otp")
public ResponseEntity<ApiResponse> verifyOtp(
        @Valid @RequestBody VerifyOtpRequest request
) {

    VerifyOtpResponse response = authService.verifyOtp(request);

    return ResponseEntity.ok(
            ApiResponse.builder()
                    .success(true)
                    .message("OTP verified successfully")
                    .data(response)
                    .build()
    );
}
}