package com.dailycodebuffer.client.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class ProductModel {
        private String name;
        private double price;
        private String imageSrc;
        private String imageAlt;
        private String category;
        private String sex;
        //save here the quantity which has to be 0 by default , in the Product table it doesn't need to be
        // -> no need for this variable inside the Product class entity
        //save it seperately inside the storage table
        private int quantity;
        private String barCode;
    }
