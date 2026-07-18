

package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.AnalyticsEvent;
import com.aakash.portfolio.cms.entity.AnalyticsEventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {

    long countByEventType(AnalyticsEventType eventType);

    Page<AnalyticsEvent> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<AnalyticsEvent> findByEventTypeOrderByCreatedAtDesc(
            AnalyticsEventType eventType
    );

}