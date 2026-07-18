package com.aakash.portfolio.cms.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aakash.portfolio.cms.entity.ContactMessage;
import com.aakash.portfolio.cms.entity.ContactMessageStatus;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findByStatusOrderByCreatedAtDesc(ContactMessageStatus status);

    List<ContactMessage> findAllByOrderByCreatedAtDesc();
Page<ContactMessage> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(ContactMessageStatus status);

    long count();

    long countByReadAtIsNull();

}