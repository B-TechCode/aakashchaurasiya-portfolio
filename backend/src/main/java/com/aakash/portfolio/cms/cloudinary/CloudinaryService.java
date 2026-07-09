package com.aakash.portfolio.cms.cloudinary;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

    CloudinaryUploadResult uploadImage(MultipartFile file, String folder, String publicId);

    CloudinaryUploadResult uploadRawPdf(MultipartFile file, String folder, String publicId);

    void deleteResource(String publicId, String resourceType);

}


