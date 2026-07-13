

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

    @Value("${spring.mail.username}")
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

            mail.setTo(recipientEmail);

            mail.setSubject("📩 New Portfolio Contact Message");

            mail.setText("""
                    You have received a new message from your portfolio website.

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
        }
    }
}