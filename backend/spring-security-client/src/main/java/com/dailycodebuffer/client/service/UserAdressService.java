package com.dailycodebuffer.client.service;

import com.dailycodebuffer.client.entity.User;
import com.dailycodebuffer.client.entity.UserAdress;
import com.dailycodebuffer.client.model.UserAdressModel;
import com.dailycodebuffer.client.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface UserAdressService {


    Optional<UserAdress> getUserAdressById(Long userId);

    ResponseEntity<String> saveUserAdress(UserAdressModel userAdressModel);

   UserAdress updateUserAdressById(Long userId,UserAdressModel userAdressModel);
}
