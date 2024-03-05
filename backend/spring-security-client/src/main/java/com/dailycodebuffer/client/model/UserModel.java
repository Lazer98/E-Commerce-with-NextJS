package com.dailycodebuffer.client.model;

import com.dailycodebuffer.client.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String matchingPassword;
    private String role;
    private Long id;

    public UserModel(User user) {
            this.id=user.getId();
            this.firstName = user.getFirstName();
            this.lastName = user.getLastName();
            this.email = user.getEmail();
            this.phone=user.getPhone();
            this.password = user.getPassword(); // Note: You might not want to expose the actual password in UserModel
            this.matchingPassword = user.getPassword(); // You might need to set this appropriately based on your requirements
            this.role = user.getRole();
    }
}
