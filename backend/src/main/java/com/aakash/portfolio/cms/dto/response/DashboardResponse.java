


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
public class DashboardResponse {

    private long projects;

    private long skills;

    private long experiences;

    private long certificates;

    private long resumes;

    private long messages;

    private long unreadMessages;

    private long resumeDownloads;

    private long githubClicks;

    private long linkedinClicks;

    private long projectClicks;

}