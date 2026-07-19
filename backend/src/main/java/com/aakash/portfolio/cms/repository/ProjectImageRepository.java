package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.Project;
import com.aakash.portfolio.cms.entity.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {

    List<ProjectImage> findByProjectOrderByCreatedAtAsc(Project project);

    List<ProjectImage> findByProjectIdOrderByCreatedAtAsc(Long projectId);

    Optional<ProjectImage> findByProjectIdAndPrimaryTrue(Long projectId);
    List<ProjectImage> findByProjectId(Long projectId);
}
