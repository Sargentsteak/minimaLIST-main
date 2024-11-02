package com.minimalist.todolist.repositories;

import com.minimalist.todolist.entities.List;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ListRepository extends ReactiveMongoRepository<List, String> {
    
    Flux<List> findAllByUserIdOrderByIndexAsc(String userId);
    Mono<Void> deleteByUserId(String userId);
    
}
