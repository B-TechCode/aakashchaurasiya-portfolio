package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.entity.SocialLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {

    List<SocialLink> findByProfileOrderByDisplayOrderAsc(Profile profile);

    List<SocialLink> findByProfileIdOrderByDisplayOrderAsc(Long profileId);
}
