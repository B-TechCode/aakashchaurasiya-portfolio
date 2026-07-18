package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.AnalyticsRequest;
import com.aakash.portfolio.cms.dto.response.AnalyticsCountResponse;
import com.aakash.portfolio.cms.dto.response.AnalyticsResponse;
import com.aakash.portfolio.cms.entity.AnalyticsEvent;
import com.aakash.portfolio.cms.entity.AnalyticsEventType;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.AnalyticsEventRepository;
import com.aakash.portfolio.cms.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsEventRepository analyticsEventRepository;

    @Override
    @Transactional
    public AnalyticsResponse recordEvent(
            AnalyticsEventType eventType,
            AnalyticsRequest request,
            HttpServletRequest httpRequest
    ) {

        AnalyticsEvent event = AnalyticsEvent.builder()
                .eventType(eventType)
                .entityType(request.getEntityType())
                .entityId(request.getEntityId())
                .ipHash(hashIp(httpRequest.getRemoteAddr()))
                .userAgent(httpRequest.getHeader("User-Agent"))
                .build();

        event = analyticsEventRepository.save(event);

        return toResponse(event);
    }

@Override
public Page<AnalyticsResponse> getAllEvents(int page, int size) {

    Pageable pageable = PageRequest.of(page, size);

    Page<AnalyticsEvent> analyticsPage =
            analyticsEventRepository.findAllByOrderByCreatedAtDesc(pageable);

    return new PageImpl<>(

            analyticsPage.getContent()
                    .stream()
                    .map(this::toResponse)
                    .toList(),

            pageable,

            analyticsPage.getTotalElements()

    );

}

    @Override
    public List<AnalyticsResponse> getEventsByType(AnalyticsEventType eventType) {

        return analyticsEventRepository.findByEventTypeOrderByCreatedAtDesc(eventType)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
public AnalyticsCountResponse getCounts() {

    return AnalyticsCountResponse.builder()
            .resumeDownloads(
                    analyticsEventRepository.countByEventType(
                            AnalyticsEventType.RESUME_DOWNLOAD))

            .projectClicks(
                    analyticsEventRepository.countByEventType(
                            AnalyticsEventType.PROJECT_VIEW))

            .githubClicks(
                    analyticsEventRepository.countByEventType(
                            AnalyticsEventType.GITHUB_CLICK))

            .linkedinClicks(
                    analyticsEventRepository.countByEventType(
                            AnalyticsEventType.LINKEDIN_CLICK))

            .contactFormSubmissions(
                    analyticsEventRepository.countByEventType(
                            AnalyticsEventType.CONTACT_FORM_SUBMISSION))

            .portfolioVisits(
                    analyticsEventRepository.countByEventType(
                            AnalyticsEventType.PORTFOLIO_VISIT))

            .totalEvents(
                    analyticsEventRepository.count())

            .build();
}




    @Override
    @Transactional
    public void deleteEvent(Long id) {

        if (!analyticsEventRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Analytics event not found with id: " + id);
        }

        analyticsEventRepository.deleteById(id);
    }

    private AnalyticsResponse toResponse(AnalyticsEvent event) {

        return AnalyticsResponse.builder()
                .id(event.getId())
                .eventType(event.getEventType())
                .entityType(event.getEntityType())
                .entityId(event.getEntityId())
                .ipHash(event.getIpHash())
                .userAgent(event.getUserAgent())
                .createdAt(event.getCreatedAt())
                .build();
    }

    private String hashIp(String ip) {

        try {

            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(ip.getBytes(StandardCharsets.UTF_8));

            return HexFormat.of().formatHex(hash);

        } catch (NoSuchAlgorithmException e) {

            return null;
        }
    }
}