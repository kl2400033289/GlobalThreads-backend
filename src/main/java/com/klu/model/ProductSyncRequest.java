package com.klu.model;

import java.util.List;

import com.klu.entity.Product;

public class ProductSyncRequest {

    private List<Product> products;

    // Default constructor
    public ProductSyncRequest() {}

    // Parameterized constructor
    public ProductSyncRequest(List<Product> products) {
        this.products = products;
    }

    // Getter
    public List<Product> getProducts() {
        return products;
    }

    // Setter
    public void setProducts(List<Product> products) {
        this.products = products;
    }
}