package com.aakash.portfolio.cms.controller;


import com.aakash.portfolio.cms.dto.response.ProjectImageResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.aakash.portfolio.cms.dto.request.ProjectRequest;
import com.aakash.portfolio.cms.dto.response.ApiResponse;
import com.aakash.portfolio.cms.dto.response.ProjectResponse;
import com.aakash.portfolio.cms.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/projects")
@RequiredArgsConstructor
public class AdminProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProjects() {
        List<ProjectResponse> projects = projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Projects fetched successfully").data(projects).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProjectById(@PathVariable Long id) {
        ProjectResponse project = projectService.getProjectById(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Project fetched successfully").data(project).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createProject(@Valid @RequestBody ProjectRequest request) {
        ProjectResponse project = projectService.createProject(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.builder().success(true).message("Project created successfully").data(project).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequest request) {
        ProjectResponse project = projectService.updateProject(id, request);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Project updated successfully").data(project).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Project deleted successfully").build());
    }




@DeleteMapping("/images/{imageId}")
public ResponseEntity<ApiResponse> deleteProjectImage(
        @PathVariable Long imageId
) {

    projectService.deleteProjectImage(imageId);

    return ResponseEntity.ok(

            ApiResponse.builder()
                    .success(true)
                    .message("Project image deleted successfully")
                    .build()

    );
}



@PutMapping("/images/{imageId}/primary")
public ResponseEntity<ApiResponse> setPrimaryImage(
        @PathVariable Long imageId
) {

    ProjectImageResponse response =
            projectService.setPrimaryImage(imageId);

    return ResponseEntity.ok(

            ApiResponse.builder()
                    .success(true)
                    .message("Primary image updated successfully")
                    .data(response)
                    .build()

    );
}

}
