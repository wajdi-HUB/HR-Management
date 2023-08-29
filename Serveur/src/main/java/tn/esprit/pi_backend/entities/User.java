package tn.esprit.pi_backend.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;
    @Column(name ="email")
    private String email;
    @Column(name = "FirstName")
    private String firstName;
    @Column(name = "LastName")
    private String lastName;
    @Column(name = "PhoneNum")
    private String phoneNumber;
    @Column(name = "Adress")
    private String address;

    @ManyToMany
    @JoinTable(
            name = "user_formation",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "formation_id"))
    private Set<Formation> formations;

    // getters and setters
}
