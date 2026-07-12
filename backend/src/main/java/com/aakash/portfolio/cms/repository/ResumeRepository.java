package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByProfileOrderByUploadedAtDesc(Profile profile);

    List<Resume> findByProfileIdOrderByUploadedAtDesc(Long profileId);

    Optional<Resume> findTopByProfileOrderByVersionDesc(Profile profile);

    long count();
}
