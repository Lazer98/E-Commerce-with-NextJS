package com.dailycodebuffer.client.model;

import lombok.Data;

@Data
public class PasswordModel {

    private String email;
    private String newPasswordDuplicate;
    private String newPassword;
}
