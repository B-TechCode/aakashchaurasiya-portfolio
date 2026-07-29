
package com.aakash.portfolio.cms.service.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private static final String BREVO_EMAIL_API_URL =
            "https://api.brevo.com/v3/smtp/email";

    private final WebClient.Builder webClientBuilder;

    @Value("${ADMIN_EMAIL}")
    private String recipientEmail;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.mail.from-name}")
    private String fromName;

    @Value("${BREVO_API_KEY}")
    private String brevoApiKey;

    @Override
    public void sendContactNotification(
            String name,
            String email,
            String subject,
            String message
    ) {

        String emailBody = """
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
        );

        sendEmail(
                recipientEmail,
                "New Portfolio Contact Message",
                emailBody
        );

        log.info("Contact notification email sent successfully.");
    }

    @Override
    public void sendLoginOtp(
            String email,
            String otp
    ) {

        String emailBody = """
                Hello,

                Your Portfolio CMS verification code is:

                %s

                This OTP is valid for 5 minutes.

                If you didn't request this login, please ignore this email.

                Regards,
                Aakash Portfolio
                """.formatted(otp);

        sendEmail(
                email,
                "Portfolio CMS - Login OTP",
                emailBody
        );

        log.info("OTP email sent successfully to {}", email);
    }

    private void sendEmail(
            String toEmail,
            String subject,
            String textContent
    ) {

        try {

            Map<String, Object> requestBody = Map.of(
                    "sender", Map.of(
                            "name", fromName,
                            "email", fromEmail
                    ),
                    "to", List.of(
                            Map.of("email", toEmail)
                    ),
                    "subject", subject,
                    "textContent", textContent
            );

            webClientBuilder
                    .build()
                    .post()
                    .uri(BREVO_EMAIL_API_URL)
                    .header("api-key", brevoApiKey)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(requestBody)
                    .retrieve()
                    .toBodilessEntity()
                    .block();

        } catch (Exception ex) {

            log.error(
                    "Failed to send email through Brevo API to {}.",
                    toEmail,
                    ex
            );

            throw new RuntimeException(
                    "Failed to send email through Brevo API",
                    ex
            );
        }
    }
}

