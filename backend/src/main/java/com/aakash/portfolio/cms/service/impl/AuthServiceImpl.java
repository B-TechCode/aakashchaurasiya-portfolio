package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.LoginRequest;
import com.aakash.portfolio.cms.dto.request.VerifyOtpRequest;
import com.aakash.portfolio.cms.dto.response.OtpResponse;
import com.aakash.portfolio.cms.dto.response.VerifyOtpResponse;
import com.aakash.portfolio.cms.entity.AdminUser;
import com.aakash.portfolio.cms.entity.LoginOtp;
import com.aakash.portfolio.cms.repository.AdminUserRepository;
import com.aakash.portfolio.cms.security.JwtUtil;
import com.aakash.portfolio.cms.service.AuthService;
import com.aakash.portfolio.cms.service.OtpService;
import com.aakash.portfolio.cms.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AdminUserRepository adminUserRepository;
    private final AuthenticationManager authenticationManager;
    private final OtpService otpService;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    @Override
    public OtpResponse login(LoginRequest request) {

        if (request == null || request.getUsername() == null || request.getPassword() == null) {
            throw new BadCredentialsException("Invalid login request");
        }

        AdminUser adminUser = adminUserRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!adminUser.isEnabled()) {
            throw new BadCredentialsException("Admin account is disabled");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String otp = otpService.generateAndSaveOtp(adminUser.getEmail());

        emailService.sendLoginOtp(adminUser.getEmail(), otp);

        return OtpResponse.builder()
                .otpSent(true)
                .message("OTP sent successfully")
                .email(adminUser.getEmail())
                .build();
    }

    @Override
    public VerifyOtpResponse verifyOtp(VerifyOtpRequest request) {

        if (request == null || request.getEmail() == null || request.getOtp() == null) {
            throw new BadCredentialsException("Invalid OTP request");
        }

        LoginOtp loginOtp = otpService.getLatestOtp(request.getEmail());

        if (loginOtp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadCredentialsException("OTP has expired");
        }

        if (!loginOtp.getOtp().equals(request.getOtp())) {
            throw new BadCredentialsException("Invalid OTP");
        }

        AdminUser adminUser = adminUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Admin account not found"));

        String token = jwtUtil.generateToken(adminUser.getUsername());

        otpService.deleteOtp(request.getEmail());

        return VerifyOtpResponse.builder()
                .verified(true)
                .message("OTP verified successfully")
                .token(token)
                .build();
    }
}