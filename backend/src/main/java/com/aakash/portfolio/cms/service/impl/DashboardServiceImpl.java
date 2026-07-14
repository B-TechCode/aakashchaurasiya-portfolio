


package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.response.DashboardResponse;
import com.aakash.portfolio.cms.entity.AnalyticsEventType;
import com.aakash.portfolio.cms.repository.AnalyticsEventRepository;
import com.aakash.portfolio.cms.repository.CertificateRepository;
import com.aakash.portfolio.cms.repository.ContactMessageRepository;
import com.aakash.portfolio.cms.repository.ExperienceRepository;
import com.aakash.portfolio.cms.repository.ProjectRepository;
import com.aakash.portfolio.cms.repository.ResumeRepository;
import com.aakash.portfolio.cms.repository.SkillRepository;
import com.aakash.portfolio.cms.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final CertificateRepository certificateRepository;
    private final ResumeRepository resumeRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final AnalyticsEventRepository analyticsEventRepository;

    @Override
    public DashboardResponse getDashboard() {

        return DashboardResponse.builder()
                .projects(projectRepository.count())
                .skills(skillRepository.count())
                .experiences(experienceRepository.count())
                .certificates(certificateRepository.count())
                .resumes(resumeRepository.count())
                .messages(contactMessageRepository.count())
                .unreadMessages(contactMessageRepository.countByReadAtIsNull())
                .resumeDownloads(
                        analyticsEventRepository.countByEventType(
                                AnalyticsEventType.RESUME_DOWNLOAD
                        )
                )
                .githubClicks(
                        analyticsEventRepository.countByEventType(
                                AnalyticsEventType.GITHUB_CLICK
                        )
                )
                .linkedinClicks(
                        analyticsEventRepository.countByEventType(
                                AnalyticsEventType.LINKEDIN_CLICK
                        )
                )
                .projectClicks(
                        analyticsEventRepository.countByEventType(
                               AnalyticsEventType.PROJECT_VIEW
                        )
                )
                .build();
    }
}