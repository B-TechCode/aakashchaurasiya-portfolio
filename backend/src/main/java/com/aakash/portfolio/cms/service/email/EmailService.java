package com.aakash.portfolio.cms.service.email;

public interface EmailService {

    void sendContactNotification(
            String name,
            String email,
            String subject,
            String message
    );

    void sendLoginOtp(
            String email,
            String otp
    );

}