package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ContactRequest;
import com.aakash.portfolio.cms.dto.response.ContactResponse;

import java.util.List;

public interface ContactMessageService {

    ContactResponse submitMessage(ContactRequest request);

    List<ContactResponse> getAllMessages();

    ContactResponse getMessageById(Long id);

    ContactResponse markAsRead(Long id);

    void deleteMessage(Long id);
}