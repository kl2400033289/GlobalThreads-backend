package com.globalthreads.backend.controller;

import com.globalthreads.backend.model.Product;
import com.globalthreads.backend.model.ProductSyncRequest;
import com.globalthreads.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> result = new HashMap<>();
        result.put("ok", true);
        return result;
    }

    @GetMapping("/products")
    public Map<String, Object> getProducts() {
        List<Product> products = productService.getAllProducts();
        Map<String, Object> result = new HashMap<>();
        result.put("products", products);
        return result;
    }

    @PutMapping("/products/sync")
    public Map<String, Object> syncProducts(@RequestBody ProductSyncRequest request) {
        List<Product> products = request.getProducts() == null ? List.of() : request.getProducts();
        productService.syncProducts(products);

        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("products", products);
        result.put("message", products.isEmpty() ? "Products cleared from MySQL." : "Products synced to MySQL.");
        return result;
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, Object>> deleteProduct(@PathVariable("id") long id) {
        if (id <= 0) {
            Map<String, Object> bad = new HashMap<>();
            bad.put("message", "Invalid product id.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bad);
        }

        productService.deleteProduct(id);
        Map<String, Object> ok = new HashMap<>();
        ok.put("success", true);
        return ResponseEntity.ok(ok);
    }
}
