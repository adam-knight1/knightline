package org.knightline.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** Cross origin resource class that allows backend code to interact
 * with the frontend code contained in the frontend directory
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Applying CORS to all endpoints
                .allowedOrigins("http://localhost:3000")  // Allowing the temporary local frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allowing standard methods
                .allowedHeaders("*")
                .allowCredentials(true)  // Optional if I need to include cookies later
                .maxAge(3600);  // age for options request
    }
}

