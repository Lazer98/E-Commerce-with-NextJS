package com.dailycodebuffer.client.controller;

import com.dailycodebuffer.client.entity.User;
import com.dailycodebuffer.client.entity.UserAdress;
import com.dailycodebuffer.client.model.UserAdressModel;
import com.dailycodebuffer.client.model.UserModel;
import com.dailycodebuffer.client.service.UserAdressService;
import com.dailycodebuffer.client.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAdressService userAdressService;

    @GetMapping(path="/allUsers/{userId}")
    public ResponseEntity<List<UserModel>> getAllUsers(@PathVariable("userId")Long userId){
        List<UserModel> users= userService.getAllUsers(userId);
        if(users != null){
            return ResponseEntity.ok(users);
        }else{
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping(path="/user/search/{searchVariable}")
    public List<UserModel> getUserBySearch(@PathVariable("searchVariable")String searchVariable){
        return  userService.getUserBySearch(searchVariable);
    }

    @GetMapping(path="/user/{userId}")
    public UserModel getUserById(@PathVariable("userId")Long userId){
        return  userService.getUserById(userId);
    }

    @GetMapping(path="/userAdress/{userId}")
    public Optional<UserAdress> getUserAdressById(@PathVariable("userId")Long userId){
        return  userAdressService.getUserAdressById(userId);
    }
    @PutMapping(path="/userAdress/{userId}")
    public ResponseEntity<String> updateUserAdressById(@PathVariable("userId")Long userId,@RequestBody UserAdressModel userAdressModel){
        if(userAdressService.updateUserAdressById(userId,userAdressModel)!=null){
            return ResponseEntity.ok("Updated successfully!");
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occurred!");
        }
    }

    @PostMapping("/userAdress")
    public ResponseEntity<String> saveUserAdress(@RequestBody UserAdressModel userAdressModel){
        return  userAdressService.saveUserAdress(userAdressModel);
    }

    @GetMapping(path="/email/{email}")
    public boolean userExists(@PathVariable("email")String email){
        User user= userService.findUserByEmail(email);

        if(user ==  null){
            return false;
        }
        else{
            return true;
        }
    }


}
