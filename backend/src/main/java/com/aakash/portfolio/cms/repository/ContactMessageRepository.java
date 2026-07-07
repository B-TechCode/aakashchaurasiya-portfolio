package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.ContactMessage;
import com.aakash.portfolio.cms.entity.ContactMessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findByStatusOrderByCreatedAtDesc(ContactMessageStatus status);

    List<ContactMessage> findAllByOrderByCreatedAtDesc();

    long countByStatus(ContactMessageStatus status);
}
