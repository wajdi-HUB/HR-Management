package tn.esprit.pi_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi_backend.entities.Task;


@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

}
