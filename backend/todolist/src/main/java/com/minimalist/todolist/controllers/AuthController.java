package com.minimalist.todolist.controllers;

import com.minimalist.todolist.mappers.UserMapper;
import com.minimalist.todolist.model.UserDTO;
import com.minimalist.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    
    @PostMapping("api/auth/register")
    public Mono<String> register(@RequestBody UserDTO userDTO){
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userRepository.findByEmail(userDTO.getEmail())
                .map(user -> {return "User Already Exists";})
                .switchIfEmpty(userRepository.save(userMapper.userDtoToUser(userDTO))
                        .thenReturn("Success"));
    }
    
}
