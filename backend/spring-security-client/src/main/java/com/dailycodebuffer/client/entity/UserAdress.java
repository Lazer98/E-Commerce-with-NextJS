package com.dailycodebuffer.client.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(
        name = "user_adress"
)
public class UserAdress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "FK_USER_ADRESS"))
    private User user;
    private String city;
    private String street;
    private int streetNumber;
    private String entrance;
    private String zipCode;

}
