package com.dailycodebuffer.client.service;

import com.dailycodebuffer.client.entity.Product;;
import com.dailycodebuffer.client.model.ProductModel;

import java.util.List;

public interface ProductService {
    Product saveProduct(ProductModel productModel);

    Product getProductByID(Long id);

    List<Product> getAllProducts();

    String updateProduct(Long id,ProductModel productModel);

    String deleteProduct(Long id);

    List<Product> getProductsByCategory(String categoryName);

    List<Product> getProductsBySearchParams(String searchParams);

    Product getProductByBarCode(String barCode);
}

