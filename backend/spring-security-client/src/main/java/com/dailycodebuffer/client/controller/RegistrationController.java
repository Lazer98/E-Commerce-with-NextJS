package com.dailycodebuffer.client.controller;

import antlr.ASTFactory;
import antlr.Utils;
import com.dailycodebuffer.client.entity.LoginToken;
import com.dailycodebuffer.client.entity.User;
import com.dailycodebuffer.client.entity.VerificationToken;
import com.dailycodebuffer.client.errors.EmailAlreadyExistsException;
import com.dailycodebuffer.client.event.RegistrationCompleteEvent;
import com.dailycodebuffer.client.event.listener.RegistrationCompleteEventListener;
import com.dailycodebuffer.client.model.EmailRequest;
import com.dailycodebuffer.client.model.LoginModel;
import com.dailycodebuffer.client.model.PasswordModel;
import com.dailycodebuffer.client.model.UserModel;
import com.dailycodebuffer.client.service.EmailService;
import com.dailycodebuffer.client.service.UserService;
import com.nimbusds.jose.JOSEException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class RegistrationController {

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private RegistrationCompleteEventListener registrationEventListener;

    @Autowired
    private  EmailService emailService;


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserModel userModel, final HttpServletRequest request) {
        try {
            User user = userService.registerUser(userModel);
            publisher.publishEvent(new RegistrationCompleteEvent(
                    user,
                    applicationUrl(request)
            ));
            String verificationLink = registrationEventListener.getVerificationLink();

            if (verificationLink != null) {
                //send an email with the verification Link
                EmailRequest emailRequest = new EmailRequest(userModel.getEmail(),
                        "http://localhost:3000/verifyRegistry/verifyRegistry?verifyRegistry=" + verificationLink,
                        "Welcome,please verify your account.");
                this.sendEmail(emailRequest);
                return ResponseEntity.ok(verificationLink); // Return the verification link
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to generate verification link");
            }
        } catch (EmailAlreadyExistsException e) {
            // Handle the case when the email already exists
            log.info("Duplicate Email");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        } catch (Exception e) {
            // Handle other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


    public String sendEmail(EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
        return "Email sent successfully!";
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginModel loginModel, final HttpServletRequest request) {
        try {
            String loginToken = userService.loginUser(loginModel);

            if (loginToken != null) {
                return ResponseEntity.ok(loginToken); // Return the verification link
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            // Log the exception for debugging purposes
            Utils logger = null;
            logger.error("Error during login", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @GetMapping("/verifyRegistration")
    public ResponseEntity<String> verifyRegistration(@RequestParam("token") String token) throws JOSEException {
        String result = userService.validateVerificationToken(token);
        if(result.equalsIgnoreCase("valid")) {
            String encryptedLoginToken = userService.generateTokenAFterRegister(token);
            log.info(encryptedLoginToken);
            return ResponseEntity.ok(encryptedLoginToken);
        }
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad User");
    }


    @GetMapping("/resendVerifyToken")
    public String resendVerificationToken(@RequestParam("token") String oldToken,
                                          HttpServletRequest request) {
        VerificationToken verificationToken
                = userService.generateNewVerificationToken(oldToken);
        User user = verificationToken.getUser();
        resendVerificationTokenMail(user, applicationUrl(request), verificationToken);
        return "Verification Link Sent";
    }

    @PostMapping("/resetPassword/first/{email}")
    public String requestToResetPassword(@PathVariable("email") String email, HttpServletRequest request) {
        User user = userService.findUserByEmail(email);
        String url = "";
        if(user!=null) {
            String token = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user,token);
            url = passwordResetTokenMail(user,applicationUrl(request), token);
        }
        else {
            return "Invalid user!";
        }
        //send an email with the verification Link of the reset
        EmailRequest emailRequest=new EmailRequest(email,
                "http://localhost:3000/verifyResetPassword/verifyReset?verifyReset="+url ,
                "You've requested to reset your password.");
        this.sendEmail(emailRequest);
        return url;
    }

    @GetMapping("/verifyResetToken")
    public String verifyResetToken(@RequestParam("token") String token,HttpServletRequest request) {
        String result = userService.validatePasswordResetToken(token);
        if(!result.equalsIgnoreCase("valid")) {
            return "Invalid Token";
        }else {
            return
                    applicationUrl(request)
                            + "/savePassword?token="
                            + token;
        }
    }
    @PostMapping("/savePassword")
    public String savePassword(@RequestParam("token") String token,
                               @RequestBody PasswordModel passwordModel) {
        String result = userService.validatePasswordResetToken(token);
        if(!result.equalsIgnoreCase("valid")) {
            return "Invalid Token";
        }
        Optional<User> user = userService.getUserByPasswordResetToken(token);
        if(user.isPresent()) {
            userService.changePassword(user.get(), passwordModel.getNewPassword());
            return "Password Reset Successfully";
        } else {
            return "Invalid Token";
        }
    }

    @DeleteMapping("/loginToken/{token}")
    public String deleteLoginToken(@PathVariable ("token")String token){
        return userService.deleteLoginToken(token);
    }

    private String passwordResetTokenMail(User user, String applicationUrl, String token) {
        String url =
                applicationUrl
                        + "/verifyResetToken?token="
                        + token;

        //sendVerificationEmail()
        log.info("Click the link to Reset your Password: {}",
                url);
        return url;
    }


    private void resendVerificationTokenMail(User user, String applicationUrl, VerificationToken verificationToken) {
        String url =
                applicationUrl
                        + "/verifyRegistration?token="
                        + verificationToken.getToken();

        //sendVerificationEmail()
        log.info("Click the link to verify your account: {}",
                url);
    }


    private String applicationUrl(HttpServletRequest request) {
        return "http://" +
                request.getServerName() +
                ":" +
                request.getServerPort() +
                request.getContextPath();
    }

}
