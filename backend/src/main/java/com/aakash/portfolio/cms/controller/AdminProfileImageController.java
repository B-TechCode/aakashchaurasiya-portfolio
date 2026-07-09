package com.aakash.portfolio.cms.controller;

import com.aakash.portfolio.cms.dto.request.ProfileImageUploadMultipartRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ProfileImageUploadResponse;
import com.aakash.portfolio.cms.service.CloudinaryAssetService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;


        @RestController
        @RequestMapping("/api/admin/profile")
        @RequiredArgsConstructor
        public class AdminProfileImageController {

            private final CloudinaryAssetService cloudinaryAssetService;

       

            @PostMapping(
        value = "/image",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ResponseEntity<ApiResponse> uploadProfileImage(

        @RequestPart("image") MultipartFile image,

        @RequestPart("meta") String meta

) throws Exception {

    ObjectMapper mapper = new ObjectMapper();

    ProfileImageUploadMultipartRequest request =
            mapper.readValue(meta, ProfileImageUploadMultipartRequest.class);

    ProfileImageUploadResponse response =
            cloudinaryAssetService.uploadProfileImage(
                    1L,
                    image,
                    request.folder(),
                    request.publicId()
            );

    return ResponseEntity.status(HttpStatus.CREATED)
            .body(
                    ApiResponse.builder()
                            .success(true)
                            .message("Profile image uploaded successfully")
                            .data(response)
                            .build()
            );

        }
}
// @PostMapping(
//         value="/image",
//         consumes = MediaType.MULTIPART_FORM_DATA_VALUE
// )
// public ResponseEntity<?> uploadProfileImage(

//         @RequestPart("image") MultipartFile image,

//         @RequestPart("meta") String meta

// ) {

//     System.out.println("META = " + meta);

//     return ResponseEntity.ok(meta);
// }