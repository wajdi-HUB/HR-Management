package tn.esprit.pi_backend.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User sender;

    @ManyToOne
    private ChatRoom chatRoom;

    private String content;

    private LocalDateTime timestamp;
}
