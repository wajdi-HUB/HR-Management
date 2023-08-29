package tn.esprit.pi_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi_backend.entities.Project;
import tn.esprit.pi_backend.repositories.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService implements IProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Override
    public Project save(Project project) {
        return projectRepository.save(project);
    }
   @Override
    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }
    @Override
    public List<Project> findAll() {
        return (List<Project>) projectRepository.findAll();
    }
    @Override
    public void deleteById(Long id) {
        projectRepository.deleteById(id);
    }
}