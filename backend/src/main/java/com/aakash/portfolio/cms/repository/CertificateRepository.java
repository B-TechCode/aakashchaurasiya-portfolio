package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    List<Certificate> findAllByOrderByDisplayOrderAscIssuedDateDesc();




    long count();
}
