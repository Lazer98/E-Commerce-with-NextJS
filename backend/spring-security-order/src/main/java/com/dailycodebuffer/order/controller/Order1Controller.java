package com.dailycodebuffer.order.controller;

import com.dailycodebuffer.client.model.EmailRequest;
import com.dailycodebuffer.client.service.EmailService;
import com.dailycodebuffer.order.entity.Order1;
import com.dailycodebuffer.order.model.OrderModel;
import com.dailycodebuffer.order.service.Order1Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/order")
public class Order1Controller {

    @Autowired
    Order1Service order1Service;

    @Autowired
    private EmailService emailService;

    @GetMapping()
    public List<Order1> getAllOrders(){
        return order1Service.getAllOrders();

    }
    @GetMapping(path="/user/{userId}")
    public ResponseEntity<Optional<List<Order1>>> getAllOrdersByUserId(@PathVariable("userId")Long userId){
        Optional<List<Order1>> orders=  order1Service.getAllOrdersByUserId(userId);
        if(orders != null){
            return ResponseEntity.ok(orders);
        }
        else{
            return ResponseEntity.badRequest().body(null);
        }
    }
    @GetMapping(path="{orderId}")
    public Optional<Order1> getOrderById(@PathVariable("orderId")Long id){
        return order1Service.getOrderByID(id);
    }


    @PostMapping
    public ResponseEntity<String> saveOrder(@RequestBody OrderModel orderModel){
        ResponseEntity<String> responseEntity = order1Service.saveOrder(orderModel);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            order1Service.sendEmail(orderModel.getCustomer_id(),orderModel);
            return ResponseEntity.ok("Order was placed successfully!");
        }else{
             return responseEntity;
     }
    }

    @DeleteMapping("path={orderId}")
    public void deleteOrder(@PathVariable("orderId")Long id){
        order1Service.deleteOrder(id);
    }

    @PutMapping("{orderId}")
    public Order1 updateOrder(
            @PathVariable("orderId") Long orderId,
            @RequestBody(required=false) OrderModel orderModel){
        return order1Service.updateOrder(orderId,orderModel);

    }

    public String sendEmail(EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
        return "Email sent successfully!";
    }
}
