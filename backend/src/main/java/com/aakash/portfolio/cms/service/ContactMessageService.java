package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ContactRequest;
import com.aakash.portfolio.cms.dto.response.ContactResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ContactMessageService {

    ContactResponse submitMessage(ContactRequest request);

    Page<ContactResponse> getAllMessages(int page, int size);

    ContactResponse getMessageById(Long id);

    ContactResponse markAsRead(Long id);

    void deleteMessage(Long id);
}