package com.aakash.portfolio.cms.service.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${ADMIN_EMAIL}")
    private String recipientEmail;

    @Override
    public void sendContactNotification(
            String name,
            String email,
            String subject,
            String message
    ) {

        try {

            SimpleMailMessage mail = new SimpleMailMessage();

            mail.setFrom(recipientEmail);
            mail.setTo(recipientEmail);

            mail.setSubject("📩 New Portfolio Contact Message");

            mail.setText("""
                    You have received a new contact message.

                    Name:
                    %s

                    Email:
                    %s

                    Subject:
                    %s

                    Message:
                    %s
                    """.formatted(
                    name,
                    email,
                    subject,
                    message
            ));

            mailSender.send(mail);

            log.info("Contact notification email sent successfully.");

        } catch (Exception ex) {

            log.error("Failed to send contact notification email.", ex);
            throw new RuntimeException(ex);
        }
    }

    @Override
    public void sendLoginOtp(
            String email,
            String otp
    ) {

        try {

            SimpleMailMessage mail = new SimpleMailMessage();

            mail.setFrom(recipientEmail);
            mail.setTo(email);

            mail.setSubject("Portfolio CMS - Login OTP");

            mail.setText("""
                    Hello,

                    Your Portfolio CMS verification code is:

                    %s

                    This OTP is valid for 5 minutes.

                    If you didn't request this login, please ignore this email.

                    Regards,
                    Portfolio CMS
                    """.formatted(otp));

            mailSender.send(mail);

            log.info("OTP email sent successfully to {}", email);

        } catch (Exception ex) {

            log.error("Failed to send OTP email.", ex);
            throw new RuntimeException(ex);
        }
    }
}