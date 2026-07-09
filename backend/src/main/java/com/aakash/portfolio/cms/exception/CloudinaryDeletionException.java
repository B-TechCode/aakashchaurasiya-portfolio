package com.aakash.portfolio.cms.exception;

public class CloudinaryDeletionException extends RuntimeException {

    public CloudinaryDeletionException(String message) {
        super(message);
    }

    public CloudinaryDeletionException(String message, Throwable cause) {
        super(message, cause);
    }
}

