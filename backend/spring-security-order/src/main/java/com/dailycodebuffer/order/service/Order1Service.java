package com.dailycodebuffer.order.service;

import com.dailycodebuffer.order.entity.Order1;
import com.dailycodebuffer.order.model.OrderModel;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface Order1Service {
     Order1 updateOrder(Long id, OrderModel orderModel);

    List<Order1> getAllOrders();

    Optional<Order1> getOrderByID(Long id);


    ResponseEntity<String> saveOrder(OrderModel orderModel);

    boolean sendEmail(Long id ,OrderModel orderDetails);

    String deleteOrder(Long id);

    Optional<List<Order1>> getAllOrdersByUserId(Long id);
}
