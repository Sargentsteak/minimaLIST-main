package com.minimalist.todolist.controllers;

import com.minimalist.todolist.model.TodoDTO;
import com.minimalist.todolist.services.ListService;
import com.minimalist.todolist.services.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    
    private final ListService listService;
    private final TodoService todoService;
    public static final String TODO_PATH = "/api/v1/todo";
    public static final String TODO_PATH_ID = TODO_PATH + "/{todoId}";
    
    @GetMapping(TODO_PATH + "/{listId}")
    Flux<TodoDTO> listTodos(@PathVariable("listId") String listId){
        return todoService.getAll(listId)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NO_CONTENT)));
    }
    
    @PostMapping(TODO_PATH)
    Mono<TodoDTO> createTodo(@RequestBody @Validated TodoDTO dto){
        
        return listService.getListById(dto.getListId())
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .flatMap(listDTO -> todoService.create(dto));
    }
    
    @PutMapping(TODO_PATH_ID)
    Mono<TodoDTO>  updateTodo(@PathVariable("todoId") String todoId,
                              @RequestBody @Validated TodoDTO dto){
        return todoService.update(todoId, dto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NO_CONTENT)));
    }
    
    @DeleteMapping(TODO_PATH_ID)
    Mono<Void> deleteTodo(@PathVariable("todoId") String todoId){
        return todoService.getTodoById(todoId)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .flatMap(foundTodo-> todoService.delete(foundTodo.getId()));
    }
    
}
