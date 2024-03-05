package com.dailycodebuffer.client.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(
        name = "user",
        uniqueConstraints = @UniqueConstraint(columnNames = "email")
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(name = "email", unique = true, nullable = false, columnDefinition = "VARCHAR(255) COLLATE NOCASE")
    private String email;

    @Column(length = 60)
    private String password;

    private String role;
    private String phone;
    private boolean enabled = false;

}
