package com.globalthreads.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI globalThreadsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Global Threads API")
                        .description("Swagger documentation for Global Threads backend APIs")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Global Threads Team")
                                .email("support@globalthreads.com")));
    }
}
