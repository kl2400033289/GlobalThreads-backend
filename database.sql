CREATE DATABASE IF NOT EXISTS global_threads
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE global_threads;

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
);