package tn.esprit.pi_backend.entities;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

public class PrimeSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Prime prime;

    private LocalDate startDate;

    private LocalDate endDate;

    // Other attributes and relationships

    // Getters and setters
}
