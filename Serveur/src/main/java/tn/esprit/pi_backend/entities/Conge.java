package tn.esprit.pi_backend.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Conge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_conge")
    private String typeConge;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "statut")
    private String statut;

    @ManyToOne
    @JoinColumn(name = "employe_id")
    private User employe;

    @Column(name = "commentaires")
    private String commentaires;

    // Getters and setters
}
