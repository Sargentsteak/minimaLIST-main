package com.minimalist.todolist.services;

import com.minimalist.todolist.mappers.UserMapper;
import com.minimalist.todolist.model.UserDTO;
import com.minimalist.todolist.repositories.ListRepository;
import com.minimalist.todolist.repositories.TodoRepository;
import com.minimalist.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ListRepository listRepository;
    private final TodoRepository todoRepository;
    
    @Override
    public Mono<UserDTO> changePassword(String userId, String newPassword) {
        return userRepository.findById(userId)
                .map(foundUser->{
                    foundUser.setPassword(newPassword);
                    return foundUser;}
                ).flatMap(userRepository::save)
                .map(userMapper::userToUserDTO);
    }
    
    @Override
    public Mono<UserDTO> update(String userId, UserDTO userDTO) {
        return userRepository.findById(userId)
                .map(foundUser-> {
                    foundUser.setEmail(userDTO.getEmail());
                    foundUser.setUsername(userDTO.getUsername());
                    return foundUser;
                })
                .flatMap(userRepository::save)
                .map(userMapper::userToUserDTO);
    }
    
    @Override
    public Mono<Void> delete(String userId) {
        
        return listRepository.findAllByUserIdOrderByIndexAsc(userId)
                .map(list -> todoRepository.deleteByListId(list.getId())
                        .then(listRepository.deleteById(list.getId())))
                .then(userRepository.deleteById(userId));
    }
    
    @Override
    public Mono<UserDTO> getDetails(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .map(user -> {
                    user.setPassword("");
                    return userMapper.userToUserDTO(user);
                });
    }
}
