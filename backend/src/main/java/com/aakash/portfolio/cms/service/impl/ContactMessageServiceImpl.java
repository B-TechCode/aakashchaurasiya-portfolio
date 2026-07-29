
package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.ContactRequest;
import com.aakash.portfolio.cms.dto.response.ContactResponse;
import com.aakash.portfolio.cms.entity.ContactMessage;
import com.aakash.portfolio.cms.entity.ContactMessageStatus;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.ContactMessageRepository;
import com.aakash.portfolio.cms.service.ContactMessageService;
import com.aakash.portfolio.cms.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    @Override
    @Transactional
    public ContactResponse submitMessage(ContactRequest request) {

        ContactMessage contactMessage = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .message(request.getMessage())
                .status(ContactMessageStatus.NEW)
                .build();

        contactMessage = contactMessageRepository.save(contactMessage);

        // Send email notification after saving the message
        emailService.sendContactNotification(
                contactMessage.getName(),
                contactMessage.getEmail(),
                "New Portfolio Contact",
                contactMessage.getMessage()
        );

        return toResponse(contactMessage);
    }

  @Override
public Page<ContactResponse> getAllMessages(int page, int size) {

    Pageable pageable = PageRequest.of(page, size);

    Page<ContactMessage> contactPage =
            contactMessageRepository.findAllByOrderByCreatedAtDesc(pageable);

    return new PageImpl<>(

            contactPage.getContent()
                    .stream()
                    .map(this::toResponse)
                    .toList(),

            pageable,

            contactPage.getTotalElements()
    );
}

    @Override
    public ContactResponse getMessageById(Long id) {

        ContactMessage contactMessage = contactMessageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Contact message not found with id: " + id));

        return toResponse(contactMessage);
    }

    @Override
    @Transactional
    public ContactResponse markAsRead(Long id) {

        ContactMessage contactMessage = contactMessageRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Contact message not found with id: " + id));

        contactMessage.setStatus(ContactMessageStatus.READ);

        if (contactMessage.getReadAt() == null) {
            contactMessage.setReadAt(LocalDateTime.now());
        }

        contactMessage = contactMessageRepository.save(contactMessage);

        return toResponse(contactMessage);
    }

   @Override
@Transactional
public void deleteMessage(Long id) {

    ContactMessage contactMessage = contactMessageRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Contact message not found with id: " + id));

    contactMessage.setDeletedAt(LocalDateTime.now());

    contactMessageRepository.delete(contactMessage);
}

@Override
public long getUnreadCount() {
    return contactMessageRepository.countByStatus(ContactMessageStatus.NEW);
}

private ContactResponse toResponse(ContactMessage contactMessage) {

    return ContactResponse.builder()
            .id(contactMessage.getId())
            .name(contactMessage.getName())
            .email(contactMessage.getEmail())
            .message(contactMessage.getMessage())
            .status(contactMessage.getStatus())
            .createdAt(contactMessage.getCreatedAt())
            .readAt(contactMessage.getReadAt())
            .build();
}
}

