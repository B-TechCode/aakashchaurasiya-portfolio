
package com.aakash.portfolio.cms.service.impl;
import com.aakash.portfolio.cms.dto.response.SkillResponse;

import com.aakash.portfolio.cms.cloudinary.CloudinaryService;
import com.aakash.portfolio.cms.cloudinary.CloudinaryUploadResult;
import com.aakash.portfolio.cms.dto.request.ProjectRequest;
import com.aakash.portfolio.cms.dto.response.ProjectImageResponse;
import com.aakash.portfolio.cms.dto.response.ProjectResponse;
import com.aakash.portfolio.cms.entity.Project;
import com.aakash.portfolio.cms.entity.ProjectImage;
import com.aakash.portfolio.cms.repository.ProjectRepository;
import com.aakash.portfolio.cms.repository.ProjectImageRepository;
import com.aakash.portfolio.cms.repository.SkillRepository;
import com.aakash.portfolio.cms.entity.Skill;
import com.aakash.portfolio.cms.exception.DuplicateResourceException;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
 @RequiredArgsConstructor
@Transactional(readOnly = true)
 public class ProjectServiceImpl implements ProjectService {

private final ProjectRepository projectRepository;
private final ProjectImageRepository projectImageRepository;
private final SkillRepository skillRepository;
private final CloudinaryService cloudinaryService;

                @Override
                @Transactional
                public ProjectResponse createProject(ProjectRequest request) {
                    if (projectRepository.existsBySlug(request.getSlug())) {
                        throw new DuplicateResourceException("Project with slug '" + request.getSlug() + "' already exists");
                    }

                    Project project = Project.builder()
                            .title(request.getTitle())
                            .slug(request.getSlug())
                            .description(request.getDescription())
                            .summary(request.getSummary())
                            .githubUrl(request.getGithubUrl())
                            .liveUrl(request.getLiveUrl())
                            .featured(request.isFeatured())
                            .published(request.isPublished())
                            .displayOrder(request.getDisplayOrder())
                            .build();

                    if (request.getSkillIds() != null && !request.getSkillIds().isEmpty()) {
                        Set<Skill> skills = new HashSet<>(skillRepository.findAllById(request.getSkillIds()));
                        project.setSkills(skills);
                    }

                    Project saved = projectRepository.save(project);
                    return toResponse(saved);
                }

                @Override
                @Transactional
                public ProjectResponse updateProject(Long id, ProjectRequest request) {
                    Project project = projectRepository.findById(id)
                            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

                    if (!project.getSlug().equals(request.getSlug()) && projectRepository.existsBySlug(request.getSlug())) {
                        throw new DuplicateResourceException("Project with slug '" + request.getSlug() + "' already exists");
                    }

                    project.setTitle(request.getTitle());
                    project.setSlug(request.getSlug());
                    project.setDescription(request.getDescription());
                    project.setSummary(request.getSummary());
                    project.setGithubUrl(request.getGithubUrl());
                    project.setLiveUrl(request.getLiveUrl());
                    project.setFeatured(request.isFeatured());
                    project.setPublished(request.isPublished());
                    project.setDisplayOrder(request.getDisplayOrder());

                    if (request.getSkillIds() != null) {
                      Set<Skill> skills =
        new HashSet<>(skillRepository.findAllById(request.getSkillIds()));

System.out.println("========== SKILLS ==========");
System.out.println(request.getSkillIds());
System.out.println(skills.size());

for (Skill s : skills) {
    System.out.println(s.getId() + " -> " + s.getName());
}
System.out.println("============================");

project.setSkills(skills);
                    }

                    return toResponse(projectRepository.save(project));
                }

                @Override
                @Transactional
                public void deleteProject(Long id) {
                    if (!projectRepository.existsById(id)) {
                        throw new ResourceNotFoundException("Project not found with id: " + id);
                    }
                    projectRepository.deleteById(id);
                }

                @Override
                public ProjectResponse getProjectById(Long id) {
                    Project project = projectRepository.findById(id)
                            .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
                    return toResponse(project);
                }

                @Override
                public ProjectResponse getProjectBySlug(String slug) {
                    Project project = projectRepository.findBySlug(slug)
                            .orElseThrow(() -> new ResourceNotFoundException("Project not found with slug: " + slug));
                    return toResponse(project);
                }

                @Override
                public List<ProjectResponse> getAllProjects() {
                    return projectRepository.findAll().stream()
                            .map(this::toResponse)
                            .collect(Collectors.toList());
                }

                @Override
                public List<ProjectResponse> getPublishedProjects() {
                    return projectRepository.findByPublishedTrueOrderByDisplayOrderAsc().stream()
                            .map(this::toResponse)
                            .collect(Collectors.toList());
                }

                @Override
                public List<ProjectResponse> getFeaturedProjects() {
                    return projectRepository.findByFeaturedTrueAndPublishedTrueOrderByDisplayOrderAsc().stream()
                            .map(this::toResponse)
                            .collect(Collectors.toList());
                }

            private ProjectResponse toResponse(Project project) {

                List<ProjectImageResponse> images =
                        projectImageRepository.findByProjectIdOrderByCreatedAtAsc(project.getId())
                                .stream()
                                .map(this::toProjectImageResponse)
                                .toList();

                return ProjectResponse.builder()
                        .id(project.getId())
                        .title(project.getTitle())
                        .slug(project.getSlug())
                        .description(project.getDescription())
                        .summary(project.getSummary())
                        .githubUrl(project.getGithubUrl())
                        .liveUrl(project.getLiveUrl())
                        .featured(project.isFeatured())
                        .published(project.isPublished())
                        .displayOrder(project.getDisplayOrder())
                        .createdAt(project.getCreatedAt())
                        .updatedAt(project.getUpdatedAt())



           .skills(

    project.getSkills() == null

            ? List.of()

            : project.getSkills()

                    .stream()

                    .map(skill -> SkillResponse.builder()

                            .id(skill.getId())

                            .name(skill.getName())

                            .category(skill.getCategory())

                            .proficiency(skill.getProficiency())

                            .iconName(skill.getIconName())

                            .displayOrder(skill.getDisplayOrder())

                            .published(skill.isPublished())

                            .createdAt(skill.getCreatedAt())

                            .updatedAt(skill.getUpdatedAt())

                            .build()

                    )

                    .toList()

)


                        .images(images)
                        .build();
            }



            private ProjectImageResponse toProjectImageResponse(ProjectImage image) {

            return ProjectImageResponse.builder()
                    .id(image.getId())
                    .imageUrl(image.getImageUrl())
                    .publicId(image.getPublicId())
                    .caption(image.getCaption())
                    .primary(image.isPrimary())
                    .createdAt(image.getCreatedAt())
                    .updatedAt(image.getUpdatedAt())
                    .build();
        }


       @Override
@Transactional
public ProjectImageResponse uploadProjectImage(
        Long projectId,
        MultipartFile image,
        String caption,
        boolean primary
) {

    Project project = projectRepository.findById(projectId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Project not found with id : " + projectId));

    if (primary) {

        projectImageRepository
                .findByProjectIdAndPrimaryTrue(projectId)
                .ifPresent(existing -> {

                    existing.setPrimary(false);
                    projectImageRepository.save(existing);

                });
    }

    CloudinaryUploadResult uploadResult =
            cloudinaryService.uploadImage(
                    image,
                    "portfolio/projects",
                    null
            );

    ProjectImage projectImage = ProjectImage.builder()
            .project(project)
            .imageUrl(uploadResult.secureUrl())
            .publicId(uploadResult.publicId())
            .caption(caption)
            .primary(primary)
            .build();

    projectImageRepository.save(projectImage);

    return toProjectImageResponse(projectImage);
}

    @Override
@Transactional
public void deleteProjectImage(Long imageId) {

    ProjectImage image = projectImageRepository.findById(imageId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Project image not found with id : " + imageId));

    if (image.getPublicId() != null && !image.getPublicId().isBlank()) {

        cloudinaryService.deleteResource(
                image.getPublicId(),
                "image"
        );
    }
  
   
}  
   
   @Override
@Transactional
public ProjectImageResponse setPrimaryImage(Long imageId) {

    ProjectImage image = projectImageRepository.findById(imageId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Project image not found with id : " + imageId));

    projectImageRepository
            .findByProjectIdAndPrimaryTrue(image.getProject().getId())
            .ifPresent(existing -> {

                existing.setPrimary(false);
                projectImageRepository.save(existing);

            });

    image.setPrimary(true);

    projectImageRepository.save(image);

    return toProjectImageResponse(image);
  }



}
