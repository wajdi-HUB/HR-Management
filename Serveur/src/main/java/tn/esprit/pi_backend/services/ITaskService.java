package tn.esprit.pi_backend.services;
import tn.esprit.pi_backend.entities.Task;

import java.util.List;
import java.util.Optional;

public interface ITaskService {
    public Task save(Task task);
    public Optional<Task> findById(Long id);
    public List<Task> findAll();
    public void deleteById(Long id);
}
