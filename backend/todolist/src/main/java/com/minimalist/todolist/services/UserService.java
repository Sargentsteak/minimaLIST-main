package com.minimalist.todolist.services;

import com.minimalist.todolist.model.UserDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.reactive.function.server.ServerRequest;
import reactor.core.publisher.Mono;

public interface UserService {
    
        Mono<UserDTO> changePassword(String userId, String newPassword);
        
        Mono<UserDTO> update(String userId, UserDTO userDTO);
        
        Mono<Void> delete(String userId);
        
        Mono<UserDTO> getDetails(Authentication authentication);
}
