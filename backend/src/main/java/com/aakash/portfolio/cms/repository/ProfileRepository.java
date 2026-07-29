package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.AdminUser;
import com.aakash.portfolio.cms.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByAdminUser(AdminUser adminUser);

    Optional<Profile> findByAdminUserId(Long adminUserId);

    Optional<Profile> findFirstByOrderByIdAsc();
}
