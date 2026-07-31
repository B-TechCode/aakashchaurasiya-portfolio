package com.aakash.portfolio.cms.security;

import com.aakash.portfolio.cms.ratelimit.RateLimitFilter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final Logger log =
            LoggerFactory.getLogger(SecurityConfig.class);

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;
    private final RateLimitFilter rateLimitFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // ================= CORS =================
                .cors(cors -> {})

                // ================= CSRF =================
                // REST API uses JWT instead of server-side sessions.
                .csrf(AbstractHttpConfigurer::disable)

                // ================= Security Headers =================
                .headers(headers -> headers

                        .frameOptions(frame ->
                                frame.sameOrigin()
                        )

                        .contentTypeOptions(content -> {})

                        .xssProtection(xss -> {})

                        .httpStrictTransportSecurity(hsts -> hsts
                                .includeSubDomains(true)
                                .maxAgeInSeconds(31536000)
                        )
                )

                // ================= Stateless Session =================
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // ================= Authentication Errors =================
                .exceptionHandling(ex ->
                        ex.authenticationEntryPoint(
                                authenticationEntryPoint
                        )
                )

                // ================= Authorization =================
                .authorizeHttpRequests(auth -> auth

                        // ---------- Health Check ----------
                        // Public so Docker / Render / monitoring services
                        // can check whether the application is running.
                        .requestMatchers(
                                "/actuator/health",
                                "/actuator/health/**"
                        ).permitAll()

                       // ---------- Public APIs ----------
.requestMatchers(
        "/api/auth/**",
        "/api/public/**",
        "/api/test/**",
        "/api/contact"
).permitAll()


// ---------- Public Contact Form ----------
.requestMatchers(
        HttpMethod.POST,
        "/api/contact"
).permitAll()

                        // ---------- Swagger / OpenAPI ----------
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/webjars/**"
                        ).permitAll()

                        // ---------- Admin APIs ----------
                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")

                        // ---------- Everything Else ----------
                        .anyRequest()
                        .authenticated()
                )

                // ================= Authentication Provider =================
                .authenticationProvider(authenticationProvider())

                // ================= Filters =================
                .addFilterBefore(
                        rateLimitFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        log.info("Security configuration loaded.");

        return http.build();
    }

    // ================= Authentication Provider =================

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();

        provider.setUserDetailsService(
                customUserDetailsService
        );

        provider.setPasswordEncoder(
                passwordEncoder()
        );

        return provider;
    }

    // ================= Authentication Manager =================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }

    // ================= Password Encoder =================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}