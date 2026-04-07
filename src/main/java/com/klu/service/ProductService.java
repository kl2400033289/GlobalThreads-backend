package com.klu.service;



import com.klu.entity.Product;
import com.klu.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    // Get all products
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // Sync products (replace all)
    public void syncProducts(List<Product> products) {
        repo.deleteAll();
        repo.saveAll(products);
    }

    // Delete product
    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }
}
