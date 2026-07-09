package com.aakash.portfolio.cms.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret
    ) {

        System.out.println("==================================");
        System.out.println("Cloud Name = " + cloudName);
        System.out.println("API Key = " + apiKey);
        System.out.println("Secret Empty = " + apiSecret.isBlank());
        System.out.println("==================================");

        Map<String, String> config = ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        );

        return new Cloudinary(config);
    }
}