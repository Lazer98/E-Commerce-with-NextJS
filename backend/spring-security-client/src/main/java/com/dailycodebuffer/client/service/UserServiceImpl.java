package com.dailycodebuffer.client.service;

import com.dailycodebuffer.client.entity.LoginToken;
import com.dailycodebuffer.client.entity.PasswordResetToken;
import com.dailycodebuffer.client.entity.User;
import com.dailycodebuffer.client.entity.VerificationToken;
import com.dailycodebuffer.client.errors.EmailAlreadyExistsException;
import com.dailycodebuffer.client.model.LoginModel;
import com.dailycodebuffer.client.model.UserModel;
import com.dailycodebuffer.client.repository.LoginTokenRepository;
import com.dailycodebuffer.client.repository.PasswordResetTokenRepository;
import com.dailycodebuffer.client.repository.UserRepository;
import com.dailycodebuffer.client.repository.VerificationTokenRepository;
import com.nimbusds.jose.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private LoginTokenRepository loginTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);


    @Value("${myapp.secretKey}")
    private String secretKey;

    public UserServiceImpl() {
    }

    @Override
    public User registerUser(UserModel userModel) {
        // Check if the email already exists in the database
        if (userRepository.existsByEmail(userModel.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + userModel.getEmail());
        }
        User user = new User();
        user.setEmail(userModel.getEmail());
        user.setFirstName(userModel.getFirstName());
        user.setLastName(userModel.getLastName());
        if(userModel.getRole()==null){
            user.setRole("USER");
        }
        user.setPhone(userModel.getPhone());
        user.setPassword(passwordEncoder.encode(userModel.getPassword()));

        userRepository.save(user);
        return user;
    }

    @Override
    public void saveVerificationTokenForUser(String token, User user) {
        VerificationToken verificationToken
                = new VerificationToken(user, token);

        verificationTokenRepository.save(verificationToken);
    }

    @Override
    public String validateVerificationToken(String token) {
        VerificationToken verificationToken
                = verificationTokenRepository.findByToken(token);

        if (verificationToken == null) {
            return "invalid";
        }

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpirationTime().getTime()
                - cal.getTime().getTime()) <= 0) {
            verificationTokenRepository.delete(verificationToken);
            return "expired";
        }

        user.setEnabled(true);
        userRepository.save(user);
        return "valid";
    }

    @Override
    public String generateTokenAFterRegister(String token) throws JOSEException {
        VerificationToken verificationToken
                = verificationTokenRepository.findByToken(token);
        User user = verificationToken.getUser();
        LoginModel loginModel = new LoginModel();
        loginModel.setEmail(user.getEmail());
        loginModel.setPassword(user.getPassword());
        //Found the user ,after extracting him from the token
        //Defining a LoginModel acc to the user credentials
        //Call the loginUser() method to get the encrypted token
        String jwtToken=this.loginUser(loginModel);
        return jwtToken;
    }

    @Override
    public VerificationToken generateNewVerificationToken(String oldToken) {
        VerificationToken verificationToken
                = verificationTokenRepository.findByToken(oldToken);
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationTokenRepository.save(verificationToken);
        return verificationToken;
    }

    @Override
    public User findUserByEmail(String email) {
        try {
            return userRepository.findByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken passwordResetToken
                = new PasswordResetToken(user,token);
        passwordResetTokenRepository.save(passwordResetToken);
    }

    @Override
    public String validatePasswordResetToken(String token) {
        PasswordResetToken passwordResetToken
                = passwordResetTokenRepository.findByToken(token);

        if (passwordResetToken == null) {
            return "invalid";
        }

        User user = passwordResetToken.getUser();
        Calendar cal = Calendar.getInstance();

        if ((passwordResetToken.getExpirationTime().getTime()
                - cal.getTime().getTime()) <= 0) {
            passwordResetTokenRepository.delete(passwordResetToken);
            return "expired";
        }

        return "valid";
    }

    @Override
    public Optional<User> getUserByPasswordResetToken(String token) {
        return Optional.ofNullable(passwordResetTokenRepository.findByToken(token).getUser());
    }

    @Override
    public void changePassword(User user, String newPassword) {
        log.info(String.valueOf(user));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        log.info(String.valueOf(user));
    }

    @Override
    public boolean checkIfValidOldPassword(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    @Override
    public String loginUser(LoginModel loginModel) throws JOSEException {
        User user = userRepository.findByEmail(loginModel.getEmail());
        if(user == null){
            return null;
        }
        if (passwordEncoder.matches(loginModel.getPassword(), user.getPassword())) {
            //user found ->create a new LoginToken and return it
            try {
                long expirationTimeMillis = System.currentTimeMillis() + 3600 * 1000; // 1 hour from now
                Date expirationDate = new Date(expirationTimeMillis);

                String token = Jwts.builder()
                        .setSubject(user.getFirstName())
                        .claim("firstName", user.getFirstName())
                        .claim("id", user.getId())
                        .claim("role", user.getRole())
                        .setExpiration(expirationDate)
                        .signWith(SignatureAlgorithm.HS512, secretKey)
                        .compact();
                LoginToken loginToken
                        = new LoginToken(user, token);

                loginTokenRepository.save(loginToken);

                return token;
            } catch (Exception e) {
                // Log the exception
                e.printStackTrace();
                // Handle the exception as needed
            }
        }
        else{
            return null;
        }
       return null;
    }

    @Override
    public String deleteLoginToken(String token) {
        LoginToken loginToken= loginTokenRepository.findByToken(token);
        if(loginToken !=null){
            loginTokenRepository.deleteById(loginToken.getId());
            return "Deleted successfully!";
        }
        return "Wrong token!";
    }

    @Override
    public UserModel getUserById(Long userId) {
        User user= userRepository.findById(userId).orElseThrow(()->
                new IllegalStateException("User doesn't exist"));
        UserModel userModel=new UserModel();
        userModel.setEmail(user.getEmail());
        userModel.setPhone(user.getPhone());
        userModel.setPassword(user.getPassword());
        userModel.setFirstName(user.getFirstName());
        userModel.setLastName(user.getLastName());
        return userModel;
    }

    @Override
    public List<UserModel> getAllUsers(Long userId) {
        User user= userRepository.findById(userId).orElseThrow(()->
                new IllegalStateException("User doesn't exist"));
        if(user.getRole().equals("ADMIN")){
           List<User> users = userRepository.findAll();
            return users.stream()
                    .map(UserModel::new)
                    .collect(Collectors.toList());
        }
        else {
            return null;
        }
    }

    @Override
    public List<UserModel> getUserBySearch(String searchVariable) {
        List<User> users = userRepository.findAll();

        List<UserModel> userModels = users.stream()
                .filter(user -> user.getFirstName().contains(searchVariable)
                        || user.getLastName().contains(searchVariable)
                        || user.getEmail().contains(searchVariable)
                        || user.getPhone().contains(searchVariable))
                .map(UserModel::new)
                .collect(Collectors.toList());

        return userModels;
    }


}
