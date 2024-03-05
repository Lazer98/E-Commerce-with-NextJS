package com.dailycodebuffer.client.service;

import com.dailycodebuffer.client.entity.User;
import com.dailycodebuffer.client.entity.UserAdress;
import com.dailycodebuffer.client.model.UserAdressModel;
import com.dailycodebuffer.client.repository.UserAdressRepository;
import com.dailycodebuffer.client.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@Slf4j
public class UserAdressServiceImpl implements UserAdressService{

    @Autowired
    private UserAdressRepository userAdressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<UserAdress> getUserAdressById(Long userId) {
        return userAdressRepository.findByUserId(userId);
    }

    @Override
    public ResponseEntity<String> saveUserAdress(UserAdressModel userAdressModel) {
        log.info("Here is the model"+userAdressModel);
        UserAdress userAdress=new UserAdress();
        userAdress.setCity(userAdressModel.getCity());
        userAdress.setStreet(userAdressModel.getStreet());
        userAdress.setStreetNumber(userAdressModel.getStreetNumber());
        // Check if userId is not null before making the repository call
        Long userId = userAdressModel.getUserId();
        if (userId != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
            userAdress.setUser(user);
        } else {
            // Handle the case where userId is null
            throw new RuntimeException("User ID cannot be null");
        }
        userAdress.setZipCode(userAdressModel.getZipCode());
        userAdress.setEntrance(userAdressModel.getEntrance());
        userAdressRepository.save(userAdress);


        return  ResponseEntity.ok("Saved successfully!");
    }

    @Override
    public UserAdress updateUserAdressById(Long userId,UserAdressModel userAdressModel) {
      UserAdress userAdress=userAdressRepository.findByUserId(userId).orElse(new UserAdress());
        userAdress.setCity(userAdressModel.getCity());
        userAdress.setStreetNumber(userAdressModel.getStreetNumber());
        userAdress.setStreet(userAdressModel.getStreet());
        userAdress.setZipCode(userAdressModel.getZipCode());
        userAdress.setEntrance(userAdressModel.getEntrance());;
        if (userId != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
            userAdress.setUser(user);
        } else {
            // Handle the case where userId is null
            throw new RuntimeException("User ID cannot be null");
        }
        userAdressRepository.save(userAdress);
        return userAdress;
    }

}
