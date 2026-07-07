package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.ContactMessageRequest;
import com.aakash.portfolio.cms.dto.response.ContactMessageResponse;
import com.aakash.portfolio.cms.entity.ContactMessage;
import com.aakash.portfolio.cms.entity.ContactMessageStatus;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.ContactMessageRepository;
import com.aakash.portfolio.cms.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository contactMessageRepository;

    @Override
    @Transactional
    public ContactMessageResponse submitContactMessage(ContactMessageRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .message(request.getMessage())
                .status(ContactMessageStatus.NEW)
                .build();

        return toResponse(contactMessageRepository.save(message));
    }

    @Override
    public ContactMessageResponse getContactMessageById(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));
        return toResponse(message);
    }

    @Override
    public List<ContactMessageResponse> getAllContactMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContactMessageResponse markAsRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));
        message.setStatus(ContactMessageStatus.READ);
        return toResponse(contactMessageRepository.save(message));
    }

    @Override
    @Transactional
    public void deleteContactMessage(Long id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Contact message not found with id: " + id);
        }
        contactMessageRepository.deleteById(id);
    }

    private ContactMessageResponse toResponse(ContactMessage message) {
        return ContactMessageResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .message(message.getMessage())
                .status(message.getStatus())
                .createdAt(message.getCreatedAt())
                .readAt(message.getReadAt())
                .build();
    }
}
