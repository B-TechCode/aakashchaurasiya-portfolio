package com.aakash.portfolio.cms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsCountResponse {

    private long resumeDownloads;

    private long projectClicks;

    private long githubClicks;

    private long linkedinClicks;

    private long contactFormSubmissions;

    private long totalEvents;
}