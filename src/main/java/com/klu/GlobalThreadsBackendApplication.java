package com.klu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.klu.entity")
@EnableJpaRepositories("com.klu.repository")
public class GlobalThreadsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(GlobalThreadsBackendApplication.class, args);
    }
}