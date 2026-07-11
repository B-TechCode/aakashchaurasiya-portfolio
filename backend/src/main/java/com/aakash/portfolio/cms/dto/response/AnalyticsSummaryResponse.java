package com.aakash.portfolio.cms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsSummaryResponse {

    private long resumeDownloads;

    private long projectClicks;

    private long githubClicks;

    private long linkedinClicks;

    private long contactSubmissions;

    private long totalEvents;

    private List<AnalyticsResponse> recentEvents;
}