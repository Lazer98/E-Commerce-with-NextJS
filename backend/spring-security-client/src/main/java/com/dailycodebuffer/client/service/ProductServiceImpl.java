package com.dailycodebuffer.client.service;

import com.dailycodebuffer.client.entity.Product;
import com.dailycodebuffer.client.model.ProductModel;
import com.dailycodebuffer.client.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
    public class ProductServiceImpl implements ProductService {

        @Autowired
        private ProductRepository productRepository;

    private static final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Override
        public Product saveProduct(ProductModel productModel) {
            //check if product doesn't exist yet acc to name (maybe make the name unique)
            Product product =new Product();
            product.setName(productModel.getName());
            product.setPrice(productModel.getPrice());
            product.setImageSrc(productModel.getImageSrc());
            product.setImageAlt(productModel.getImageAlt());
            product.setCategory(productModel.getCategory());
            product.setSex(productModel.getSex());
            product.setBarCode(productModel.getBarCode());
            productRepository.save(product);

            return product;
        }

        @Override
        public Product getProductByID(Long id) {
            return productRepository.findById(id).orElseThrow(()->
                    new IllegalStateException("Product doesn't exist"));
        }

        @Override
        public List<Product> getAllProducts() {
            return productRepository.findAll();
        }

        @Override
        public String updateProduct(Long id,ProductModel productModel){
        Product product =productRepository.findById(id).orElseThrow(()->
                   new IllegalStateException("Product doesn't exist"));
        if(productModel.getName() !=null && productModel.getName().length()>0 && !Objects.equals(product.getName(),
                productModel.getName())){
                product.setName(productModel.getName());
            }
            if( productModel.getPrice() > 0 && !Objects.equals(product.getPrice(), productModel.getPrice())){
                product.setPrice(productModel.getPrice());
            }
            if(productModel.getImageSrc() !=null && productModel.getImageSrc().length()>0 &&
                    !Objects.equals(product.getImageSrc(), productModel.getImageSrc())){
                product.setImageSrc(productModel.getImageSrc());
            }
            if(productModel.getImageAlt() !=null && productModel.getImageAlt().length()>0 &&
                    !Objects.equals(product.getImageAlt(), productModel.getImageAlt())){
                product.setImageAlt(productModel.getImageAlt());
            }
            if(productModel.getCategory() !=null && productModel.getCategory().length()>0 &&
                    !Objects.equals(product.getCategory(), productModel.getCategory())){
                product.setCategory(productModel.getCategory());
            }
            if(productModel.getBarCode() !=null && productModel.getBarCode().length()>0 &&
                    !Objects.equals(product.getBarCode(), productModel.getBarCode())){
                product.setBarCode(productModel.getBarCode());
            }
            if(productModel.getSex() !=null && productModel.getSex().length()>0 &&
                    !Objects.equals(product.getSex(), productModel.getSex())){
                product.setCategory(productModel.getSex());
            }
            productRepository.save(product);
            return "Success!";
        }

        @Override
        public String deleteProduct(Long id) {
            boolean exists= productRepository.existsById(id);
            if(!exists){
                throw new IllegalStateException("Product doesn't exist");
            }
            productRepository.deleteById(id);
            return "Deleted successfully!";
        }

    @Override
    public List<Product> getProductsByCategory(String categoryName) {
        List<Product> allProducts= productRepository.findAll();
        List<Product> suitableProducts = allProducts.stream()
                .filter(product -> product.getCategory().equals(categoryName))
                .collect(Collectors.toList());

        return suitableProducts;
    }

    @Override
    public List<Product> getProductsBySearchParams(String searchParams) {
        List<Product> allProducts = productRepository.findAll();

        // Split the search term into individual words
        String[] searchWords = searchParams.toLowerCase().split(" ");

        List<Product> suitableProducts = allProducts.stream()
                .filter(product -> {
                    String productName = product.getName().toLowerCase();
                    for (String searchWord : searchWords) {
                        if (productName.contains(searchWord)) {
                            return true; // Product name contains one of the search words
                        }
                    }
                    return false; // Product name does not contain any search word
                })
                .collect(Collectors.toList());

        return suitableProducts;
    }

    @Override
    public Product getProductByBarCode(String barCode) {
        return  productRepository.findByBarCode(barCode).orElseThrow(()->
                new IllegalStateException("Product doesn't exist"));
    }

}

