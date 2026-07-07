package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.Profile;
import com.aakash.portfolio.cms.entity.SeoSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeoSettingRepository extends JpaRepository<SeoSetting, Long> {

    Optional<SeoSetting> findByProfile(Profile profile);

    Optional<SeoSetting> findByProfileId(Long profileId);
}
