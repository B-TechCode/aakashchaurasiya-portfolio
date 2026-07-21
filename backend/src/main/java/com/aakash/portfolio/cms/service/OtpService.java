package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.entity.LoginOtp;
import com.aakash.portfolio.cms.repository.LoginOtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.authentication.BadCredentialsException;


import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final LoginOtpRepository loginOtpRepository;

    @Transactional
    public String generateAndSaveOtp(String email) {

        loginOtpRepository.deleteByEmail(email);

        String otp = String.format("%06d", new Random().nextInt(1_000_000));

        LoginOtp loginOtp = LoginOtp.builder()
                .email(email)
                .otp(otp)
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .verified(false)
                .build();

        loginOtpRepository.save(loginOtp);

        return otp;
    }


    @Transactional(readOnly = true)
public LoginOtp getLatestOtp(String email) {

    return loginOtpRepository.findTopByEmailOrderByIdDesc(email)
            .orElseThrow(() -> new BadCredentialsException("OTP not found"));
}

@Transactional
public void deleteOtp(String email) {
    loginOtpRepository.deleteByEmail(email);
}
}