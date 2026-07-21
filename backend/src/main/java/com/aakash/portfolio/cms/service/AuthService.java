package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.LoginRequest;
import com.aakash.portfolio.cms.dto.request.VerifyOtpRequest;
import com.aakash.portfolio.cms.dto.response.OtpResponse;
import com.aakash.portfolio.cms.dto.response.VerifyOtpResponse;

public interface AuthService {

    OtpResponse login(LoginRequest request);

    VerifyOtpResponse verifyOtp(VerifyOtpRequest request);
}