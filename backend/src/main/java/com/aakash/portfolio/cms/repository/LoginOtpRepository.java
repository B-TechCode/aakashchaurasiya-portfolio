package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.LoginOtp;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface LoginOtpRepository extends JpaRepository<LoginOtp, Long> {

    Optional<LoginOtp> findTopByEmailOrderByIdDesc(String email);

    @Transactional
    @Modifying
    void deleteByEmail(String email);
}