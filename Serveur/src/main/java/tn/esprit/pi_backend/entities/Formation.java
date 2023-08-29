package tn.esprit.pi_backend.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "formation")
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String formationName;

    private String formationStatus;

    private LocalDate dateStart;

    private LocalDate dateFinish;

    @ManyToMany(mappedBy = "formations")
    private List<Project> projects = new ArrayList<>();

    // Getters and setters
}
