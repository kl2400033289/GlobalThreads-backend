package com.klu.controller;


import com.klu.entity.Product;
import com.klu.model.ProductSyncRequest;
import com.klu.service.ProductService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // Health check
    @GetMapping("/health")
    public String health() {
        return "Backend is running!";
    }

    // Get all products
    @GetMapping("/products")
    public List<Product> getProducts() {
        return service.getAllProducts();
    }

    // Sync products
    @PutMapping("/products/sync")
    public String syncProducts(@RequestBody ProductSyncRequest request) {
        service.syncProducts(request.getProducts());
        return "Products synced successfully";
    }

    // Delete product
    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return "Product deleted";
    }
}