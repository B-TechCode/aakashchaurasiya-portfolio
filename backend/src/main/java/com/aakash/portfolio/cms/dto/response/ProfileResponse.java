package com.aakash.portfolio.cms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponse {

    private Long id;

    private String fullName;

    private String headline;

    private String aboutMe;

    private String location;

    private String email;

    private String phone;

    private String profileImageUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
