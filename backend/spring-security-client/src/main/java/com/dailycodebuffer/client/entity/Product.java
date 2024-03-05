package com.dailycodebuffer.client.entity;

import lombok.Data;


import javax.persistence.*;

@Entity
@Data
@Table(
        name = "product",
        uniqueConstraints = @UniqueConstraint(columnNames = "barCode")
)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String imageSrc;
    private String imageAlt;

    private String category;
    private String sex;
    @Column(name = "barCode", unique = true, nullable = true) //better to make nullable false
    private String barCode;
    private String description;

}
