package com.minimalist.todolist.entities;

import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.User;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class List {
    
    @Id
    private String id;
    private String emoji;
    private String title;
    private Integer index;
    
    private String userId;
    
    @CreatedDate
    private LocalDateTime createdDate;
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;
    
    @Version
    private Integer version;
    
    @CreatedBy
    private String createdBy;
    
    @LastModifiedBy
    private String modifiedBy;
}
