package com.dailycodebuffer.client.model;

import com.dailycodebuffer.client.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAdressModel {
    private String city;
    private String street;
    private Long userId;

    private int streetNumber;
    private String entrance;
    private String zipCode;
}
