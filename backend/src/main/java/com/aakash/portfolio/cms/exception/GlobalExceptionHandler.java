package com.aakash.portfolio.cms.exception;

import com.aakash.portfolio.cms.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

     public GlobalExceptionHandler() {
        System.out.println("========== GlobalExceptionHandler Loaded ==========");
    }

    // ==========================================
    // Resource Not Found (404)
    // ==========================================
   @ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ApiResponse> handleResourceNotFoundException(
        ResourceNotFoundException ex
) {

    System.out.println("################################################");
    System.out.println("######## ResourceNotFoundException HANDLER ######");
    System.out.println(ex.getMessage());
    System.out.println("################################################");

    return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(
                    ApiResponse.builder()
                            .success(false)
                            .message(ex.getMessage())
                            .build()
            );
}

    // ==========================================
    // Duplicate Resource (409)
    // ==========================================
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse> handleDuplicateResourceException(
            DuplicateResourceException ex
    ) {

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(
                        ApiResponse.builder()
                                .success(false)
                                .message(ex.getMessage())
                                .build()
                );
    }

    // ==========================================
    // Cloudinary Upload Error (500)
    // ==========================================
    @ExceptionHandler(CloudinaryUploadException.class)
    public ResponseEntity<ApiResponse> handleCloudinaryUploadException(
            CloudinaryUploadException ex
    ) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ApiResponse.builder()
                                .success(false)
                                .message(ex.getMessage())
                                .build()
                );
    }

    // ==========================================
    // Cloudinary Delete Error (500)
    // ==========================================
    @ExceptionHandler(CloudinaryDeletionException.class)
    public ResponseEntity<ApiResponse> handleCloudinaryDeletionException(
            CloudinaryDeletionException ex
    ) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ApiResponse.builder()
                                .success(false)
                                .message(ex.getMessage())
                                .build()
                );
    }

    // ==========================================
    // Validation Error (400)
    // ==========================================
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationException(
            MethodArgumentNotValidException ex
    ) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        ));

        return ResponseEntity.badRequest()
                .body(
                        ApiResponse.builder()
                                .success(false)
                                .message("Validation failed")
                                .data(errors)
                                .build()
                );
    }

    // ==========================================
    // Illegal Argument (400)
    // ==========================================
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse> handleIllegalArgumentException(
            IllegalArgumentException ex
    ) {

        return ResponseEntity.badRequest()
                .body(
                        ApiResponse.builder()
                                .success(false)
                                .message(ex.getMessage())
                                .build()
                );
    }

    // ==========================================
    // Generic Exception (500)
    // ==========================================
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleException(
            Exception ex
    ) {

        ex.printStackTrace();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ApiResponse.builder()
                                .success(false)
                                .message("Something went wrong. Please try again later.")
                                .build()
                );
    }
}