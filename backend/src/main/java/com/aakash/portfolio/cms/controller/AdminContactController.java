package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ContactResponse;
import com.aakash.portfolio.cms.service.ContactMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;

@RestController
@RequestMapping("/api/admin/contact")
@RequiredArgsConstructor
public class AdminContactController {

    private final ContactMessageService contactMessageService;

   @GetMapping
public ResponseEntity<ApiResponse> getAllMessages(

        @RequestParam(defaultValue = "0") int page,

        @RequestParam(defaultValue = "10") int size

) {

    Page<ContactResponse> messages =
            contactMessageService.getAllMessages(page, size);

    return ResponseEntity.ok(

            ApiResponse.builder()
                    .success(true)
                    .message("Messages fetched successfully")
                    .data(messages)
                    .build()

    );

}

@GetMapping("/unread-count")
public ResponseEntity<ApiResponse> getUnreadCount() {

    long unreadCount = contactMessageService.getUnreadCount();

    return ResponseEntity.ok(
            ApiResponse.builder()
                    .success(true)
                    .message("Unread message count fetched successfully")
                    .data(unreadCount)
                    .build()
    );
}

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getMessageById(
            @PathVariable Long id) {

        ContactResponse message =
                contactMessageService.getMessageById(id);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Message fetched successfully")
                        .data(message)
                        .build()
        );
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse> markAsRead(
            @PathVariable Long id) {

        ContactResponse message =
                contactMessageService.markAsRead(id);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Message marked as read")
                        .data(message)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteMessage(
            @PathVariable Long id) {

        contactMessageService.deleteMessage(id);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Message deleted successfully")
                        .build()
        );
    }
}