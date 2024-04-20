package org.knightline.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

/** This config class contains the s3client bean, which facilitates communication with S3 for photo storage
 *
 */

@Configuration
public class AwsS3Config {
    @Value("${aws.region}")
    private String region;

    @Bean
    public S3Client s3Client() { //I removed the AWSCredentials aspect as I'm sourcing with Aws_config
        return S3Client.builder()
                .region(Region.of(region))
                .build();
    }
}
