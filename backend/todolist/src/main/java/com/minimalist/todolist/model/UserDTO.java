package com.minimalist.todolist.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Version;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    
    @NotBlank
    private String id;
    @NotBlank
    private String username;
    @NotBlank
    private String email;
    private String password;
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private Integer version;
}
