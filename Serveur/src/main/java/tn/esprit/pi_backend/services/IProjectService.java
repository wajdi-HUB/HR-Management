package tn.esprit.pi_backend.services;

import tn.esprit.pi_backend.entities.Project;

import java.util.List;
import java.util.Optional;

public interface IProjectService {
    public Project save(Project project);
    public Optional<Project> findById(Long id);
    public void deleteById(Long id);
    public List<Project> findAll();
}
