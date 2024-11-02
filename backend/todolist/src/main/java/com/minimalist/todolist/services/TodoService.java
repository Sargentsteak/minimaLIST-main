package com.minimalist.todolist.services;

import com.minimalist.todolist.model.TodoDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodoService {
    Flux<TodoDTO> getAll(String listId);
    
    Mono<TodoDTO> getTodoById(String todoId);
    Mono<TodoDTO> create(TodoDTO todoDto);
    
    Mono<TodoDTO> update(String todoId, TodoDTO todoDto);
    
    Mono<Void> delete(String todoId);
}
