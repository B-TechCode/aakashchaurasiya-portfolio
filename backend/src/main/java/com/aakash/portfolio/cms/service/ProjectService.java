package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ProjectRequest;
import com.aakash.portfolio.cms.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {

    ProjectResponse createProject(ProjectRequest request);

    ProjectResponse updateProject(Long id, ProjectRequest request);

    void deleteProject(Long id);

    ProjectResponse getProjectById(Long id);

    ProjectResponse getProjectBySlug(String slug);

    List<ProjectResponse> getAllProjects();

    List<ProjectResponse> getPublishedProjects();

    List<ProjectResponse> getFeaturedProjects();
}
