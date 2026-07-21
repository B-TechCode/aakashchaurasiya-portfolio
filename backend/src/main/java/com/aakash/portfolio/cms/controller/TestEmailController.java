package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestEmailController {

    private final EmailService emailService;

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp() {

        emailService.sendLoginOtp(
                "aakashchaurasiya630@gmail.com",
                "123456"
        );

        return ResponseEntity.ok("OTP Email Sent Successfully.");
    }
}