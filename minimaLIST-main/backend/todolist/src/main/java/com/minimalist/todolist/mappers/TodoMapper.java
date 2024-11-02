package com.minimalist.todolist.mappers;

import com.minimalist.todolist.entities.Todo;
import com.minimalist.todolist.model.TodoDTO;
import org.mapstruct.Mapper;

@Mapper
public interface TodoMapper {
    
    Todo todoDtoToTodo(TodoDTO todoDTO);
    TodoDTO todoToTodoDto(Todo todo);
}
