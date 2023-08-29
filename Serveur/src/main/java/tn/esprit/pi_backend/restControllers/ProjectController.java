package tn.esprit.pi_backend.restControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi_backend.entities.Project;
import tn.esprit.pi_backend.services.IProjectService;
import tn.esprit.pi_backend.services.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private IProjectService projectService;

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.save(project);
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.findById(id).get();
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.findAll();
    }
/*
    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {
        Project existingProject = projectService.findById(id).get();
        if (existingProject != null) {
            existingProject.setProjectName(project.getProjectName());
            existingProject.setProjectStatus(project.getProjectStatus());
            return projectService.updateProject(existingProject);
        }
        return null;
    }*/

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.deleteById(id);
    }
}
