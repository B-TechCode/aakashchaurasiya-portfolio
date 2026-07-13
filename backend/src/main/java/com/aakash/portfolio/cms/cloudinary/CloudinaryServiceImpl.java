
package com.aakash.portfolio.cms.cloudinary;

import com.aakash.portfolio.cms.exception.CloudinaryDeletionException;
import com.aakash.portfolio.cms.exception.CloudinaryUploadException;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private static final Logger log =
            LoggerFactory.getLogger(CloudinaryServiceImpl.class);

    private final Cloudinary cloudinary;

    @Value("${cloudinary.folder:portfolio-cms}")
    private String defaultFolder;

    @Override
    public CloudinaryUploadResult uploadImage(
            MultipartFile file,
            String folder,
            String publicId
    ) {
        return upload(file, folder, publicId, "image");
    }

    @Override
    public CloudinaryUploadResult uploadRawPdf(
            MultipartFile file,
            String folder,
            String publicId
    ) {
        return upload(file, folder, publicId, "raw");
    }

    @Override
    public void deleteResource(String publicId, String resourceType) {

        try {

            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap(
                            "resource_type",
                            resourceType
                    )
            );

        } catch (Exception e) {

            throw new CloudinaryDeletionException(
                    "Failed to delete Cloudinary resource: publicId=" + publicId,
                    e
            );
        }
    }

    private CloudinaryUploadResult upload(
            MultipartFile file,
            String folder,
            String publicId,
            String resourceType
    ) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }

        try {

            Map<String, Object> params = new HashMap<>();

            params.put("resource_type", resourceType);

            String effectiveFolder =
                    (folder == null || folder.isBlank())
                            ? defaultFolder
                            : folder;

            if (effectiveFolder != null && !effectiveFolder.isBlank()) {
                params.put("folder", effectiveFolder);
            }

            if (publicId != null && !publicId.isBlank()) {
                params.put("public_id", publicId);
            }

            params.put("use_filename", false);
            params.put("unique_filename", false);

            log.debug("========== CLOUDINARY DEBUG ==========");
            log.debug("Uploading to Cloudinary...");
            log.debug("Params: {}", params);

            Map uploadResult =
                    cloudinary.uploader().upload(
                            file.getBytes(),
                            params
                    );

            log.debug("Upload Result: {}", uploadResult);
            log.debug("======================================");

            String secureUrl =
                    (String) uploadResult.get("secure_url");

            String uploadedPublicId =
                    (String) uploadResult.get("public_id");

            if (secureUrl == null || uploadedPublicId == null) {

                throw new CloudinaryUploadException(
                        "Cloudinary upload succeeded but response was missing secure_url/public_id"
                );
            }

            return new CloudinaryUploadResult(
                    secureUrl,
                    uploadedPublicId
            );

        } catch (IOException e) {

            throw new CloudinaryUploadException(
                    "Failed to read upload file",
                    e
            );

        } catch (Exception e) {

            throw new CloudinaryUploadException(
                    "Cloudinary upload failed",
                    e
            );
        }
    }
}