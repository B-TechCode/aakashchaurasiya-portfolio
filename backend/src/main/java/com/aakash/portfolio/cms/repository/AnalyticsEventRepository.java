package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.AnalyticsEvent;
import com.aakash.portfolio.cms.entity.AnalyticsEventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {

    List<AnalyticsEvent> findAllByOrderByCreatedAtDesc();

    List<AnalyticsEvent> findByEventTypeOrderByCreatedAtDesc(AnalyticsEventType eventType);

    long countByEventType(AnalyticsEventType eventType);
}