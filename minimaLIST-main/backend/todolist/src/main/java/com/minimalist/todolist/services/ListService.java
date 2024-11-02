package com.minimalist.todolist.services;

import com.minimalist.todolist.model.ListDTO;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ListService {
    Flux<ListDTO> getAllLists(String userId);
    
    Mono<ListDTO> getListById(String listId);
    
    Mono<ListDTO> createList(ListDTO listDTO);
    
    Mono<ListDTO> updateList(String listId, ListDTO listDTO);
    
    Mono<Void> deleteList(String listId);
}
