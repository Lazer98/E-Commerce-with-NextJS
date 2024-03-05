package com.dailycodebuffer.client.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
//      mailSender.setUsername("1092924120265-oior6916i29pn26gl0q5ntkgc6sndorh.apps.googleusercontent.com");
//        mailSender.setPassword("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");
        mailSender.setUsername("leinereliezer@gmail.com");
        mailSender.setPassword("epjzyhagzahcxmjr");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
