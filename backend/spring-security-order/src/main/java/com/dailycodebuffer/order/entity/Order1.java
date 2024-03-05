package com.dailycodebuffer.order.entity;

import com.dailycodebuffer.client.entity.Product;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Data
@Table(
        name = "order1"
)
public class Order1 {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

//        @ElementCollection
//
        @ManyToMany
        @JoinTable(
                name = "order1_product",
                joinColumns = @JoinColumn(name = "order1_id"),
                inverseJoinColumns = @JoinColumn(name = "product_id")
        )
        private List<Product> products;
         //maybe makes more sense to save only the ids and not the entire object

        private LocalDate created;

        @Column(name = "customer_id")
        private Long customerId;

        private double price;

    }

