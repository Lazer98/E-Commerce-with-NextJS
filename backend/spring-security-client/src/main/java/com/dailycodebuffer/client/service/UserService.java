package com.dailycodebuffer.client.service;

import com.dailycodebuffer.client.entity.User;
import com.dailycodebuffer.client.entity.VerificationToken;
import com.dailycodebuffer.client.model.LoginModel;
import com.dailycodebuffer.client.model.UserModel;
import com.nimbusds.jose.JOSEException;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(UserModel userModel);

    void saveVerificationTokenForUser(String token, User user);

    String validateVerificationToken(String token);

    String generateTokenAFterRegister(String token) throws JOSEException ;


    VerificationToken generateNewVerificationToken(String oldToken);

    User findUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token);

    String validatePasswordResetToken(String token);

    Optional<User> getUserByPasswordResetToken(String token);

    void changePassword(User user, String newPassword);

    boolean checkIfValidOldPassword(User user, String oldPassword);

    String loginUser(LoginModel loginModel) throws JOSEException;

    String deleteLoginToken(String token);

    UserModel getUserById(Long userId);

    List<UserModel> getAllUsers(Long userId);

    List<UserModel> getUserBySearch(String searchVariable);
}
