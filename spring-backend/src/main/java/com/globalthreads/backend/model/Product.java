package com.globalthreads.backend.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Product {
    private Long id;
    private Integer sortOrder;
    private String name;
    private Double price;
    private Double costPrice;
    private Integer stock;
    private String designNotes;
    private String image;
    private Double rating;
    private List<Map<String, Object>> reviews = new ArrayList<>();
    private String artisan;
    private List<String> sizes = new ArrayList<>();
    private String productStory;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Double costPrice) {
        this.costPrice = costPrice;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getDesignNotes() {
        return designNotes;
    }

    public void setDesignNotes(String designNotes) {
        this.designNotes = designNotes;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public List<Map<String, Object>> getReviews() {
        return reviews;
    }

    public void setReviews(List<Map<String, Object>> reviews) {
        this.reviews = reviews;
    }

    public String getArtisan() {
        return artisan;
    }

    public void setArtisan(String artisan) {
        this.artisan = artisan;
    }

    public List<String> getSizes() {
        return sizes;
    }

    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
    }

    public String getProductStory() {
        return productStory;
    }

    public void setProductStory(String productStory) {
        this.productStory = productStory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
