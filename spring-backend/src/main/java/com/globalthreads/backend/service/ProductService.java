package com.globalthreads.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.globalthreads.backend.model.Product;
import jakarta.annotation.PostConstruct;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    private final JdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    public ProductService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = new ObjectMapper();
    }

    @PostConstruct
    public void ensureSchema() {
        jdbcTemplate.execute("""
            CREATE TABLE IF NOT EXISTS products (
              id BIGINT PRIMARY KEY,
              sort_order INT NOT NULL DEFAULT 0,
              name VARCHAR(255) NOT NULL,
              price DECIMAL(12,2) NOT NULL DEFAULT 0,
              cost_price DECIMAL(12,2) NULL,
              stock INT NOT NULL DEFAULT 0,
              design_notes TEXT NULL,
              image_data LONGTEXT NOT NULL,
              image_hash CHAR(64) NOT NULL,
              rating DECIMAL(4,2) NOT NULL DEFAULT 0,
              reviews_json LONGTEXT NOT NULL,
              artisan VARCHAR(255) NOT NULL DEFAULT 'artisan',
              sizes_json LONGTEXT NOT NULL,
              product_story TEXT NULL,
              description TEXT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              INDEX idx_products_sort_order (sort_order)
            )
            """);
    }

    public List<Product> getAllProducts() {
        return jdbcTemplate.query(
            "SELECT * FROM products ORDER BY sort_order ASC, id ASC",
            (rs, rowNum) -> {
                Product product = new Product();
                product.setId(rs.getLong("id"));
                product.setSortOrder(rs.getInt("sort_order"));
                product.setName(rs.getString("name"));
                product.setPrice(rs.getDouble("price"));

                BigDecimal cost = rs.getBigDecimal("cost_price");
                product.setCostPrice(cost == null ? null : cost.doubleValue());

                product.setStock(rs.getInt("stock"));
                product.setDesignNotes(defaultString(rs.getString("design_notes")));
                product.setImage(defaultString(rs.getString("image_data")));
                product.setRating(rs.getDouble("rating"));
                product.setReviews(parseReviews(rs.getString("reviews_json")));
                product.setArtisan(defaultString(rs.getString("artisan")));
                product.setSizes(parseSizes(rs.getString("sizes_json")));
                product.setProductStory(defaultString(rs.getString("product_story")));
                product.setDescription(defaultString(rs.getString("description")));
                return product;
            }
        );
    }

    @Transactional
    public void syncProducts(List<Product> incomingProducts) {
        jdbcTemplate.update("DELETE FROM products");

        for (int i = 0; i < incomingProducts.size(); i++) {
            Product p = normalize(incomingProducts.get(i), i);
            jdbcTemplate.update(
                """
                INSERT INTO products (
                    id, sort_order, name, price, cost_price, stock, design_notes,
                    image_data, image_hash, rating, reviews_json, artisan, sizes_json,
                    product_story, description
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                p.getId(),
                p.getSortOrder(),
                p.getName(),
                p.getPrice(),
                p.getCostPrice(),
                p.getStock(),
                p.getDesignNotes(),
                p.getImage(),
                sha256Hex(p.getImage()),
                p.getRating(),
                toJson(p.getReviews()),
                p.getArtisan(),
                toJson(p.getSizes()),
                p.getProductStory(),
                p.getDescription()
            );
        }
    }

    public void deleteProduct(long id) {
        jdbcTemplate.update("DELETE FROM products WHERE id = ?", id);
    }

    private Product normalize(Product source, int index) {
        Product p = new Product();
        p.setId(source.getId() != null ? source.getId() : System.currentTimeMillis() + index);
        p.setSortOrder(index);
        p.setName(defaultString(source.getName()));
        p.setPrice(source.getPrice() != null ? source.getPrice() : 0.0);
        p.setCostPrice(source.getCostPrice());
        p.setStock(source.getStock() != null ? source.getStock() : 0);
        p.setDesignNotes(defaultString(source.getDesignNotes()));
        p.setImage(defaultString(source.getImage()));
        p.setRating(source.getRating() != null ? source.getRating() : 0.0);
        p.setReviews(source.getReviews() != null ? source.getReviews() : new ArrayList<>());
        p.setArtisan(defaultString(source.getArtisan()).isBlank() ? "artisan" : source.getArtisan());
        p.setSizes(source.getSizes() != null ? source.getSizes() : new ArrayList<>());
        p.setProductStory(defaultString(source.getProductStory()));
        p.setDescription(defaultString(source.getDescription()));
        return p;
    }

    private String sha256Hex(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(defaultString(data).getBytes(StandardCharsets.UTF_8));
            StringBuilder builder = new StringBuilder(hash.length * 2);
            for (byte b : hash) {
                builder.append(String.format("%02x", b));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }

    private String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            return "[]";
        }
    }

    private List<Map<String, Object>> parseReviews(String json) {
        try {
            if (json == null || json.isBlank()) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(json, new TypeReference<List<Map<String, Object>>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private List<String> parseSizes(String json) {
        try {
            if (json == null || json.isBlank()) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private String defaultString(String value) {
        return value == null ? "" : value;
    }
}
