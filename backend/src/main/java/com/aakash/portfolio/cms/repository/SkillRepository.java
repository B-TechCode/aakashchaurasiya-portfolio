package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByName(String name);

    List<Skill> findByPublishedTrueOrderByDisplayOrderAsc();

    List<Skill> findByCategoryAndPublishedTrueOrderByDisplayOrderAsc(String category);

    boolean existsByName(String name);
    long count();
}
