package tn.esprit.pi_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pi_backend.entities.Project;


@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

}
