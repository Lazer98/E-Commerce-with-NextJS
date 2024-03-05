package com.dailycodebuffer.client.controller;

import com.dailycodebuffer.client.controller.RegistrationController;
import com.dailycodebuffer.client.entity.User;
import com.dailycodebuffer.client.event.RegistrationCompleteEvent;
import com.dailycodebuffer.client.event.listener.RegistrationCompleteEventListener;
import com.dailycodebuffer.client.model.EmailRequest;
import com.dailycodebuffer.client.model.UserModel;
import com.dailycodebuffer.client.service.EmailService;
import com.dailycodebuffer.client.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

    @ExtendWith(MockitoExtension.class)
    public class RegistrationControllerTest {

        @InjectMocks
        private RegistrationController registrationController;

        @Mock
        private UserService userService;

        @Mock
        private ApplicationEventPublisher publisher;

        @Mock
        private RegistrationCompleteEventListener registrationEventListener;

        @Mock
        private EmailService emailService;

        @Mock
        private HttpServletRequest request;

        @Test
        public void testRegisterUser() {
            // Mock request data
            UserModel userModel = new UserModel("Tillmann", "Ecker", "tilli@web.de","12345Aaa","0584874474","12345Aaa",null,null);

            // Mock service response
            User user = new User();
            when(userService.registerUser(any(UserModel.class))).thenReturn(user);

            // Mock verification link
            when(registrationEventListener.getVerificationLink()).thenReturn("verificationLink");

            // Call controller method
            ResponseEntity<String> response = registrationController.registerUser(userModel, request);

            // Verify interactions
            verify(userService).registerUser(userModel);
            verify(publisher).publishEvent(any(RegistrationCompleteEvent.class));
            verify(emailService).sendEmail(any(EmailRequest.class));

            // Assert response status code
            assertEquals(HttpStatus.OK, response.getStatusCode());
            // Add more assertions as needed
        }

        // Add more test cases for other scenarios
    }


