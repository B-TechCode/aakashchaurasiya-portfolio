package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    
    
    Optional<Project> findBySlug(String slug);

    List<Project> findByPublishedTrueOrderByDisplayOrderAsc();

    List<Project> findByFeaturedTrueAndPublishedTrueOrderByDisplayOrderAsc();

    List<Project> findByPublishedTrueOrderByCreatedAtDesc();

    boolean existsBySlug(String slug);
    long count();
}
