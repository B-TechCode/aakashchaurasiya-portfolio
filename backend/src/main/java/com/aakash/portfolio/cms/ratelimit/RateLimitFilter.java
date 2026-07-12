package com.aakash.portfolio.cms.ratelimit;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

   @Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
) throws ServletException, IOException {

    String ip = request.getRemoteAddr();

    String path = request.getRequestURI();

    Bucket bucket;

    if (path.startsWith("/api/auth/login")) {

        bucket = cache.computeIfAbsent(
                ip + "_login",
                key -> createBucket(5)
        );

    } else if (path.startsWith("/api/contact")) {

        bucket = cache.computeIfAbsent(
                ip + "_contact",
                key -> createBucket(10)
        );

    } else if (path.startsWith("/api/admin")) {

        bucket = cache.computeIfAbsent(
                ip + "_admin",
                key -> createBucket(150)
        );

    } else {

        bucket = cache.computeIfAbsent(
                ip + "_public",
                key -> createBucket(60)
        );
    }

    if (bucket.tryConsume(1)) {

        filterChain.doFilter(request, response);

    } else {

        response.setStatus(429);
        response.setContentType("application/json");

        response.getWriter().write("""
        {
          "success": false,
          "message": "Too many requests. Please try again later."
        }
        """);
    }
}

    private Bucket createBucket(long capacity) {

    Bandwidth limit = Bandwidth.builder()
            .capacity(capacity)
            .refillGreedy(capacity, Duration.ofMinutes(1))
            .build();

    return Bucket.builder()
            .addLimit(limit)
            .build();
}
}