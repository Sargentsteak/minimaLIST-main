package com.minimalist.todolist.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePassDTO {
    
    @NotBlank
    private String newPass;
    @NotBlank
    private String confirmPass;
}
