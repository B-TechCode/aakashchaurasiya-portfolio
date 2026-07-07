package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.LoginRequest;
import com.aakash.portfolio.cms.dto.response.JwtResponse;

public interface AuthService {

    JwtResponse login(LoginRequest request);
}

