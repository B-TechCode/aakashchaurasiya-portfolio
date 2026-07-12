package com.aakash.portfolio.cms.service.impl;

import com.aakash.portfolio.cms.dto.request.CertificateRequest;
import com.aakash.portfolio.cms.dto.response.CertificateResponse;
import com.aakash.portfolio.cms.entity.Certificate;
import com.aakash.portfolio.cms.exception.ResourceNotFoundException;
import com.aakash.portfolio.cms.repository.CertificateRepository;
import com.aakash.portfolio.cms.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CertificateServiceImpl implements CertificateService {

    private final CertificateRepository certificateRepository;

    @Override
    @Transactional
    public CertificateResponse createCertificate(CertificateRequest request) {
        Certificate certificate = Certificate.builder()
                .title(request.getTitle())
                .issuer(request.getIssuer())
                .issuedDate(request.getIssuedDate())
                .credentialUrl(request.getCredentialUrl())
                .imageUrl(request.getImageUrl())
                .displayOrder(request.getDisplayOrder())
                .build();

        return toResponse(certificateRepository.save(certificate));
    }

    @Override
    @Transactional
    public CertificateResponse updateCertificate(Long id, CertificateRequest request) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with id: " + id));

        certificate.setTitle(request.getTitle());
        certificate.setIssuer(request.getIssuer());
        certificate.setIssuedDate(request.getIssuedDate());
        certificate.setCredentialUrl(request.getCredentialUrl());
        certificate.setImageUrl(request.getImageUrl());
        certificate.setDisplayOrder(request.getDisplayOrder());

        return toResponse(certificateRepository.save(certificate));
    }

    @Override
    @Transactional
    public void deleteCertificate(Long id) {
        if (!certificateRepository.existsById(id)) {
            throw new ResourceNotFoundException("Certificate not found with id: " + id);
        }
        certificateRepository.deleteById(id);
    }

    @Override
    public CertificateResponse getCertificateById(Long id) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with id: " + id));
        return toResponse(certificate);
    }

 @Override
public List<CertificateResponse> getAllCertificates() {

    return certificateRepository
            .findAllByOrderByDisplayOrderAscIssuedDateDesc()
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
}

    private CertificateResponse toResponse(Certificate certificate) {
        return CertificateResponse.builder()
                .id(certificate.getId())
                .title(certificate.getTitle())
                .issuer(certificate.getIssuer())
                .issuedDate(certificate.getIssuedDate())
                .credentialUrl(certificate.getCredentialUrl())
                .imageUrl(certificate.getImageUrl())
                .displayOrder(certificate.getDisplayOrder())
                .createdAt(certificate.getCreatedAt())
                .updatedAt(certificate.getUpdatedAt())
                .build();
    }
}
