package tn.esprit.pi_backend.entities;

import javax.persistence.*;

@Entity
public class UserBenefit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Benefit benefit;
}
