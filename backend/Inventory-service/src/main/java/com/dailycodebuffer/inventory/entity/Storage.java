package com.dailycodebuffer.inventory.entity;

import lombok.Data;

import javax.persistence.*;

    @Entity
    @Data
    @Table(
            name = "storage",
            uniqueConstraints = @UniqueConstraint(columnNames = "product_id")
    )
    public class Storage {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "product_id", unique = true, nullable = false)
        private Long productId;

        private int quantity;

    }

