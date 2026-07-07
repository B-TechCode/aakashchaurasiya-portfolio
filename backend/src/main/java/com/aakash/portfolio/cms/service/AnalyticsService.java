package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.response.AnalyticsSummaryResponse;

import java.time.LocalDate;

public interface AnalyticsService {

    AnalyticsSummaryResponse getSummary(LocalDate startDate, LocalDate endDate);
}
