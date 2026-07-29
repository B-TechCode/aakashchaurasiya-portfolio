
package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.ServiceRequest;
import com.aakash.portfolio.cms.dto.response.ServiceResponse;
import com.aakash.portfolio.cms.entity.Service;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.ServiceRepository;
import com.aakash.portfolio.cms.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;

    @Override
    @Transactional
    public ServiceResponse createService(ServiceRequest request) {

        if (serviceRepository.existsByTitle(request.getTitle())) {
            throw new IllegalArgumentException(
                    "Service already exists: " + request.getTitle()
            );
        }

        Service service = Service.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .iconName(request.getIconName())
                .tags(request.getTags())
                .displayOrder(request.getDisplayOrder())
                .published(request.isPublished())
                .build();

        return toResponse(serviceRepository.save(service));
    }

    @Override
    @Transactional
    public ServiceResponse updateService(Long id, ServiceRequest request) {

        Service service = serviceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service not found with id: " + id
                        )
                );

        if (!service.getTitle().equalsIgnoreCase(request.getTitle())
                && serviceRepository.existsByTitle(request.getTitle())) {

            throw new IllegalArgumentException(
                    "Service already exists: " + request.getTitle()
            );
        }

        service.setTitle(request.getTitle());
        service.setDescription(request.getDescription());
        service.setIconName(request.getIconName());
        service.setTags(request.getTags());
        service.setDisplayOrder(request.getDisplayOrder());
        service.setPublished(request.isPublished());

        return toResponse(serviceRepository.save(service));
    }

    @Override
    @Transactional
    public void deleteService(Long id) {

        if (!serviceRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Service not found with id: " + id
            );
        }

        serviceRepository.deleteById(id);
    }

    @Override
    public ServiceResponse getServiceById(Long id) {

        Service service = serviceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service not found with id: " + id
                        )
                );

        return toResponse(service);
    }

    @Override
    public List<ServiceResponse> getAllServices() {

        return serviceRepository.findAll()
                .stream()
                .sorted((a, b) -> {

                    Integer x = a.getDisplayOrder() == null
                            ? 999
                            : a.getDisplayOrder();

                    Integer y = b.getDisplayOrder() == null
                            ? 999
                            : b.getDisplayOrder();

                    return x.compareTo(y);
                })
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<ServiceResponse> getPublishedServices() {

        return serviceRepository
                .findByPublishedTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ServiceResponse toResponse(Service service) {

        return ServiceResponse.builder()
                .id(service.getId())
                .title(service.getTitle())
                .description(service.getDescription())
                .iconName(service.getIconName())
                .tags(service.getTags())
                .displayOrder(service.getDisplayOrder())
                .published(service.isPublished())
                .createdAt(service.getCreatedAt())
                .updatedAt(service.getUpdatedAt())
                .build();
    }
}