package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ContactMessageRequest;
import com.aakash.portfolio.cms.dto.response.ContactMessageResponse;

import java.util.List;

public interface ContactService {

    ContactMessageResponse submitContactMessage(ContactMessageRequest request);

    ContactMessageResponse getContactMessageById(Long id);

    List<ContactMessageResponse> getAllContactMessages();

    ContactMessageResponse markAsRead(Long id);

    void deleteContactMessage(Long id);
}
