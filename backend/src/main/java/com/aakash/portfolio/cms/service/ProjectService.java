

package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ProjectRequest;
import com.aakash.portfolio.cms.dto.response.ProjectImageResponse;
import com.aakash.portfolio.cms.dto.response.ProjectResponse;
import org.springframework.web.multipart.MultipartFile;

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

    // ==========================
    // Project Image Management
    // ==========================

    ProjectImageResponse uploadProjectImage(
            Long projectId,
            MultipartFile image,
            String caption,
            boolean primary
    );

    void deleteProjectImage(Long imageId);

    ProjectImageResponse setPrimaryImage(Long imageId);
}