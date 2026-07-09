package com.aakash.portfolio.cms.dto.response;

import com.aakash.portfolio.cms.entity.ContactMessageStatus;
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
public class ContactResponse {

    private Long id;

    private String name;

    private String email;

    private String message;

    private ContactMessageStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime readAt;
}