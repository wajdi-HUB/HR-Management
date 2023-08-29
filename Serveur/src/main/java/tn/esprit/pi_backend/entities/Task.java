package tn.esprit.pi_backend.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName;

    private LocalDate startDate;

    private LocalDate deadline;

    private String taskStatus;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    // Getters and setters
}

