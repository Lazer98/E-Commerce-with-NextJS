package com.dailycodebuffer.order;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

//@SpringBootApplication
@SpringBootApplication(scanBasePackages = {"com.dailycodebuffer.order", "com.dailycodebuffer.client"})
@EntityScan(basePackages = {"com.dailycodebuffer.order.entity", "com.dailycodebuffer.client.entity"})
public class SpringSecurityOrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityOrderApplication.class, args);
    }
}