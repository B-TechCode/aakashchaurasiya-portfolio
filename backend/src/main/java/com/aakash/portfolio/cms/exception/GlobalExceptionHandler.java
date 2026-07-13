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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestControllerAdvice
public class GlobalExceptionHandler {


    private static final Logger log =
            LoggerFactory.getLogger(GlobalExceptionHandler.class);

     public GlobalExceptionHandler() {
    log.info("GlobalExceptionHandler loaded.");
}

    // ==========================================
    // Resource Not Found (404)
    // ==========================================
   @ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ApiResponse> handleResourceNotFoundException(
        ResourceNotFoundException ex
) {

   log.warn("################################################");
log.warn("ResourceNotFoundException handled.");
log.warn("Message: {}", ex.getMessage());
log.warn("################################################");;

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

        log.error("Unhandled exception occurred.", ex);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ApiResponse.builder()
                                .success(false)
                                .message("Something went wrong. Please try again later.")
                                .build()
                );
    }
}