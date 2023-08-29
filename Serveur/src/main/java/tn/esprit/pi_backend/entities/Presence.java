package tn.esprit.pi_backend.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

public class Presence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_presence")
    private LocalDate datePresence;

    @Column(name = "heure_arrivee")
    private LocalTime heureArrivee;

    @Column(name = "heure_depart")
    private LocalTime heureDepart;

    @ManyToOne
    @JoinColumn(name = "employe_id")
    private User employe;

    @Column(name = "statut")
    private String statut;

    @Column(name = "commentaires")
    private String commentaires;

}
