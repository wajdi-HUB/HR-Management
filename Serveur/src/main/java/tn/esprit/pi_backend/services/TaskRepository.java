package tn.esprit.pi_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pi_backend.entities.Task;

import java.util.List;
import java.util.Optional;

@Service
public class TaskRepository implements ITaskService{
    @Autowired
    private TaskRepository taskRepository;
    @Override
    public Task save(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }
}
