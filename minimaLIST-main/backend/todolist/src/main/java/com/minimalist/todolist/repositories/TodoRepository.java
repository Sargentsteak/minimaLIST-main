package com.minimalist.todolist.repositories;

import com.minimalist.todolist.entities.Todo;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodoRepository extends ReactiveMongoRepository<Todo, String> {
    
    Flux<Todo> findAllByListIdOrderByIndexAsc(String listId);
    Mono<Void> deleteByListId(String listId);
    Mono<Integer> countByListId(String listId);
}
