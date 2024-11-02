package com.minimalist.todolist.model;

import org.springframework.security.core.userdetails.User;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDTO {
    
    private String id;
    
    
    private Boolean isChecked;
    private String content;
    private Integer index;
    
    @NotBlank
    private String listId;
    
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private String createdBy;
    private String modifiedBy;
    private Integer version;
}
