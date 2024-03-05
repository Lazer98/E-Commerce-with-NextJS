package com.dailycodebuffer.order.service;

import com.dailycodebuffer.client.entity.Product;
import com.dailycodebuffer.client.entity.User;
import com.dailycodebuffer.client.model.EmailRequest;
import com.dailycodebuffer.client.model.ProductModel;
import com.dailycodebuffer.client.model.UserModel;
import com.dailycodebuffer.order.entity.Order1;

import com.dailycodebuffer.order.model.OrderModel;
import com.dailycodebuffer.order.repository.Order1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.dailycodebuffer.inventory.entity.Storage;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class Order1ServiceImpl implements Order1Service {

    @Autowired
    Order1Repository order1Repository;

    private static final Logger log = LoggerFactory.getLogger(Order1ServiceImpl.class);


    @Override
    public Order1 updateOrder(Long id, OrderModel orderModel) {
        //convert the ProductModels to Products in order to check their availability (productModel doesn't have an id
        List<Product> products =new ArrayList<>();
        for(ProductModel productModel:orderModel.getProducts()) {
           products.add(convertProductModelToProduct(productModel));
       }
        Order1 order = order1Repository.findById(id).orElseThrow(()->
                new IllegalStateException("Order doesn't exist"));
        if(orderModel.getCreated() !=null &&
                !Objects.equals(order.getCreated(), orderModel.getCreated())){
            order.setCreated(orderModel.getCreated());
        }
        if(orderModel.getProducts().toArray().length >0 &&
                !Objects.equals(order.getProducts(), products )){
            order.setProducts(products);
        }
        if(orderModel.getPrice() >0 &&
                !Objects.equals(order.getPrice(), orderModel.getPrice())){
            order.setPrice(orderModel.getPrice());
        }
        if(orderModel.getCustomer_id() !=null &&
                !Objects.equals(order.getCustomerId(), orderModel.getCustomer_id())){
            order.setCustomerId(orderModel.getCustomer_id());
        }
        order1Repository.save(order);


        return order;
    }

    @Override
    public List<Order1> getAllOrders() {
        return order1Repository.findAll();
    }

    @Override
    public Optional<Order1> getOrderByID(Long id) {
        return order1Repository.findById(id);
    }

    @Override
    public ResponseEntity<String> saveOrder(OrderModel orderModel) {
        //convert the ProductModels to Products in order to check their availability (productModel doesn't have an id)
        List <Product> products= new ArrayList<>();
        boolean allAvailable=true;
        for(ProductModel productModel:orderModel.getProducts()){
            Product product= convertProductModelToProduct(productModel);
            if(!checkProductAvailability(product,productModel)) {
                allAvailable = false;
            }
        }
        if(!allAvailable){
            return ResponseEntity.badRequest().body("Not all products are available");
        }
        else{
            for(ProductModel productModel:orderModel.getProducts()){
                Product product= convertProductModelToProduct(productModel);
                products.add(product);
                decrementQuantityOfStorage(product,productModel);
            }
        }
            // Products are available, proceed with saving the order
            Order1 order = new Order1();
            order.setProducts(products);
            order.setCreated(orderModel.getCreated());
            order.setCustomerId(orderModel.getCustomer_id());
            order.setPrice(orderModel.getPrice());
            order1Repository.save(order);
            return ResponseEntity.ok("Succesfully!");

    }

    public boolean sendEmail(Long id,OrderModel orderModel){
        //Get the user by his id (customer_id of the order)
        RestTemplate restTemplate = new RestTemplate();

        try {
            UserModel userModel = restTemplate.getForObject("http://localhost:8086/user/{id}", UserModel.class, id);
            if (userModel == null ) {
                return false;
            }
            EmailRequest emailRequest=new EmailRequest(userModel.getEmail(),
                    "Welcome, your order has been successfully placed.\n\n" +
                            "Order Details:\n" +
                            "Order ID: " + orderModel.getId() + "\n" +
                            "Products: " + orderModel.getProducts() + "\n" +
                            "Created Date: " + orderModel.getCreated() + "\n" +
                            "Price: " + orderModel.getPrice(),
                    "Welcome,your order has ben successfully.");
            // Product is available
            return true;
        } catch (Exception e) {
            log.error("Error checking if user is available for id: {}", id, e);
            // Handle the error, e.g., throw a custom exception or return false
            throw new RuntimeException("Error checking user availability");
        }
    }
    private boolean checkProductAvailability(Product product,ProductModel productModel) {
        // Make a call to the Inventory service to check the availability of each product
            RestTemplate restTemplate = new RestTemplate();
            Long productId=product.getId();
        try {
            Storage storage = restTemplate.getForObject("http://localhost:8087/storage/{productId}", Storage.class, productId);
            if (storage == null || (storage.getQuantity() - productModel.getQuantity()) <= 0) {
                // Product is not available
                return false;
            }
            // Product is available
            return true;
        } catch (Exception e) {
            log.error("Error checking product availability for productId: {}", productId, e);
            // Handle the error, e.g., throw a custom exception or return false
            throw new RuntimeException("Error checking product availability");
        }
    }
    private void decrementQuantityOfStorage(Product product,ProductModel productModel) {
        // Make a call to the Inventory service to decrement the quantity of each product
            RestTemplate restTemplate = new RestTemplate();
            Long productId=product.getId();
        try {
            Storage storage = restTemplate.getForObject("http://localhost:8087/storage/{productId}", Storage.class, productId);
            if (storage != null) {
                storage.setQuantity(storage.getQuantity() - productModel.getQuantity());
                // Make a separate call to update the storage quantity
                restTemplate.put("http://localhost:8087/storage/{productId}", storage, productId);
            }
        } catch (Exception e) {
            log.error("Error decrementing quantity for productId: {}", productId, e);
            // Handle the error, e.g., throw a custom exception or log a warning
            throw new RuntimeException("Error decrementing quantity");
        }
    }

    private Product convertProductModelToProduct(ProductModel productModel) {
        RestTemplate restTemplate = new RestTemplate();

        try {
            return restTemplate.getForObject("http://localhost:8086/barCode/{barCode}", Product.class, productModel.getBarCode());
        } catch (Exception e) {
            log.error("Error converting ProductModel to Product for bar code : {}", productModel.getBarCode(), e);
            // Handle the error, e.g., throw a custom exception or return a default product
            throw new RuntimeException("Error converting ProductModel to Product");
        }
    }



    @Override
    public String deleteOrder(Long id) {
        boolean exists= order1Repository.existsById(id);
        if(!exists){
            throw new IllegalStateException("Order doesn't exist");
        }
        order1Repository.deleteById(id);
        return "Deleted successfully!";
    }

    @Override
    public Optional<List<Order1>> getAllOrdersByUserId(Long id) {
        return order1Repository.findByCustomerId(id);
    }
}
