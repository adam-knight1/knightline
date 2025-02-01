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
                .allowedOrigins("http://knightfam.com", "http://localhost:3000")  // allowing the temporary local frontend origin, can use allowedOriginPatterns later for multi domain
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allowing standard methods
                .allowedHeaders("*")
                //.allowedHeaders("Authorization", "Content-Type", "X-Requested-With", "Accept")  // Specify only the necessary headers
                //todo -configure permissions and headers
                .allowCredentials(true)  // Optional if I need to include cookies later
                .maxAge(3600);  // age for options request
    }
}

