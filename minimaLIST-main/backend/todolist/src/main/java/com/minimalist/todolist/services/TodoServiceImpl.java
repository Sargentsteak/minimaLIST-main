package com.minimalist.todolist.services;

import com.minimalist.todolist.mappers.TodoMapper;
import com.minimalist.todolist.model.TodoDTO;
import com.minimalist.todolist.repositories.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
    
    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;
    
    @Override
    public Flux<TodoDTO> getAll(String listId) {
        return todoRepository.findAllByListIdOrderByIndexAsc(listId)
                .map(todoMapper::todoToTodoDto);
    }
    
    @Override
    public Mono<TodoDTO> getTodoById(String todoId) {
        return todoRepository.findById(todoId)
                .map(todoMapper::todoToTodoDto);
    }
    
    @Override
    public Mono<TodoDTO> create(TodoDTO todoDto) {
        return todoRepository.save(todoMapper.todoDtoToTodo(todoDto))
                .map(todoMapper::todoToTodoDto);
    }
    
    @Override
    public Mono<TodoDTO> update(String todoId, TodoDTO todoDto) {
        return todoRepository.findById(todoId)
                .map(foundTodo -> {
                    foundTodo.setIsChecked(todoDto.getIsChecked());
                    foundTodo.setIndex(todoDto.getIndex());
                    foundTodo.setContent(todoDto.getContent());
                    return foundTodo;
                }).flatMap(todoRepository::save)
                .map(todoMapper::todoToTodoDto);
    }
    
    @Override
    public Mono<Void> delete(String todoId) {
        return todoRepository.deleteById(todoId);
    }
}
