package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.response.AnalyticsSummaryResponse;
import com.aakash.portfolio.cms.entity.AnalyticsEvent;
import com.aakash.portfolio.cms.entity.AnalyticsEventType;
import com.aakash.portfolio.cms.repository.AnalyticsEventRepository;
import com.aakash.portfolio.cms.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsEventRepository analyticsEventRepository;

    @Override
    public AnalyticsSummaryResponse getSummary(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(LocalTime.MAX);

        List<AnalyticsEvent> events = analyticsEventRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(start, end);

        long totalEvents = events.size();
        long resumeDownloads = events.stream().filter(e -> e.getEventType() == AnalyticsEventType.RESUME_DOWNLOAD).count();
        long projectClicks = events.stream().filter(e -> e.getEventType() == AnalyticsEventType.PROJECT_CLICK).count();
        long githubClicks = events.stream().filter(e -> e.getEventType() == AnalyticsEventType.GITHUB_CLICK).count();
        long linkedInClicks = events.stream().filter(e -> e.getEventType() == AnalyticsEventType.LINKEDIN_CLICK).count();
        long contactFormSubmissions = events.stream().filter(e -> e.getEventType() == AnalyticsEventType.CONTACT_FORM_SUBMISSION).count();

        return AnalyticsSummaryResponse.builder()
                .resumeDownloads(resumeDownloads)
                .projectClicks(projectClicks)
                .githubClicks(githubClicks)
                .linkedInClicks(linkedInClicks)
                .contactFormSubmissions(contactFormSubmissions)
                .build();
    }
}
