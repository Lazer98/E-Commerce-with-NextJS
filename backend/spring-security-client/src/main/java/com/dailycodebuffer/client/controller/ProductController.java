package com.dailycodebuffer.client.controller;

import com.dailycodebuffer.client.entity.Product;
import com.dailycodebuffer.client.model.ProductModel;
import com.dailycodebuffer.client.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


    @RestController
    @Slf4j
    public class ProductController {

        @Autowired
        private ProductService productService;


        @GetMapping()
        public List<Product> getAllProducts(){
            return productService.getAllProducts();

        }
        @GetMapping(path="products/{productId}")
        public Product getProductById(@PathVariable("productId")Long id){
            return productService.getProductByID(id);
        }

        @GetMapping(path="barCode/{barCode}")
        public Product getProductByBarCode(@PathVariable("barCode")String barCode){
            return productService.getProductByBarCode(barCode);
        }

        @GetMapping(path="category/{categoryName}")
        public List<Product> getProductsByCategory(@PathVariable("categoryName")String categoryName){
            return productService.getProductsByCategory(categoryName);
        }

        @GetMapping(path="searchForProduct/{searchForProduct}")
        public List<Product> getProductsBySearchParams(@PathVariable("searchForProduct")String searchParams){
            return productService.getProductsBySearchParams(searchParams);
        }

        @PostMapping
        public ResponseEntity<String> saveProduct(@RequestBody ProductModel productModel){
            Product product= productService.saveProduct(productModel);
            if(product!=null){
                return ResponseEntity.ok("Successfully!"+product.getId());
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occurred!");
            }
        }
        @PutMapping(path="products/{productId}")
        public ResponseEntity<String> editProduct(@PathVariable("productId")Long productId,
                                                  @RequestBody ProductModel productModel){
            String answer= productService.updateProduct(productId,productModel);
            if(answer!=null){
                return ResponseEntity.ok("Successfully!");
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occurred!");
            }
        }


        @DeleteMapping("path={productId}")
        public void deleteProduct(@PathVariable("productId")Long id){
            productService.deleteProduct(id);
        }
    }

