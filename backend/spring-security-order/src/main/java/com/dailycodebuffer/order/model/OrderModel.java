package com.dailycodebuffer.order.model;

import com.dailycodebuffer.client.model.ProductModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderModel {

    private Long id;

    private List<ProductModel> products;

    private LocalDate created;

    private Long customer_id;

    private double price;



}
