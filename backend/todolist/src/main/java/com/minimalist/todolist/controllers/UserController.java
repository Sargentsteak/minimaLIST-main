package com.minimalist.todolist.controllers;

import com.minimalist.todolist.model.ChangePassDTO;
import com.minimalist.todolist.model.UserDTO;
import com.minimalist.todolist.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    public static final String USER_PATH = "/api/v1/user";
    public static final String USER_PATH_ID = USER_PATH + "/{userId}";
    
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    
    @PutMapping(USER_PATH_ID)
    public Mono<UserDTO> update(@PathVariable("userId") String userId, @RequestBody UserDTO userDTO){
        return userService.update(userId, userDTO);
    }
    
    @DeleteMapping(USER_PATH_ID)
    public Mono<Void> delete(@PathVariable("userId") String userId){
        return userService.delete(userId);
    }
    @GetMapping(USER_PATH)
    public Mono<UserDTO> getUser(Authentication authentication){
        
        return userService.getDetails(authentication);
        
    }
    
    @PatchMapping(USER_PATH_ID)
    public Mono<UserDTO> changePassword(@PathVariable("userId") String userId, @RequestBody ChangePassDTO changePassDTO){
        String pass = passwordEncoder.encode(changePassDTO.getNewPass());
        String confirmPass = String.valueOf(changePassDTO.getConfirmPass());
        if(passwordEncoder.matches(confirmPass, pass)){
            System.out.println(pass);
            return userService.changePassword(userId, pass);
        }
        return Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST));
    }
    
}
