package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.AnalyticsRequest;
import com.aakash.portfolio.cms.dto.response.AnalyticsCountResponse;
import com.aakash.portfolio.cms.dto.response.AnalyticsResponse;
import com.aakash.portfolio.cms.entity.AnalyticsEventType;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface AnalyticsService {

    AnalyticsResponse recordEvent(
            AnalyticsEventType eventType,
            AnalyticsRequest request,
            HttpServletRequest httpRequest
    );

    List<AnalyticsResponse> getAllEvents();

    List<AnalyticsResponse> getEventsByType(AnalyticsEventType eventType);

    AnalyticsCountResponse getCounts();

    void deleteEvent(Long id);
}