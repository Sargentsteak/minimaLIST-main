package com.minimalist.todolist.mappers;

import com.minimalist.todolist.entities.User;
import com.minimalist.todolist.model.UserDTO;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    
    User userDtoToUser(UserDTO userDTO);
    UserDTO userToUserDTO(User user);
}
