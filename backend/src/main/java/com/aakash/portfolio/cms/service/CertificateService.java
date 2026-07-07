package com.aakash.portfolio.cms.service;

import com.aakash.portfolio.cms.dto.request.CertificateRequest;
import com.aakash.portfolio.cms.dto.response.CertificateResponse;

import java.util.List;

public interface CertificateService {

    CertificateResponse createCertificate(CertificateRequest request);

    CertificateResponse updateCertificate(Long id, CertificateRequest request);

    void deleteCertificate(Long id);

    CertificateResponse getCertificateById(Long id);

    List<CertificateResponse> getAllCertificates();
}
