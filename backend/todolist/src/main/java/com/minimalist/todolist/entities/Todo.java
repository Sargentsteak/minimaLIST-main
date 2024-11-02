package com.minimalist.todolist.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document
public class Todo {
    
    @Id
    private String id;
    private Boolean isChecked;
    private String content;
    private Integer index;
    
    private String listId;
    
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
