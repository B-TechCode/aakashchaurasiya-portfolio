package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.ServiceRequest;
import com.aakash.portfolio.cms.dto.response.ServiceResponse;

import java.util.List;

public interface ServiceService {

    ServiceResponse createService(ServiceRequest request);

    ServiceResponse updateService(Long id, ServiceRequest request);

    void deleteService(Long id);

    ServiceResponse getServiceById(Long id);

    List<ServiceResponse> getAllServices();

    List<ServiceResponse> getPublishedServices();
}