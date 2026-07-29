
package com.aakash.portfolio.cms.repository;

import com.aakash.portfolio.cms.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findByPublishedTrueOrderByDisplayOrderAsc();

    boolean existsByTitle(String title);

    long count();
}