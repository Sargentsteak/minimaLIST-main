package com.minimalist.todolist.controllers;

import com.minimalist.todolist.model.ListDTO;
import com.minimalist.todolist.services.ListService;
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
public class ListController {
    
    private static final String LIST_PATH = "/api/v1/list";
    private static final String LIST_PATH_ID = LIST_PATH + "/{listId}";
    
    private final ListService listService;
    
    @GetMapping(LIST_PATH + "/{userId}")
    Flux<ListDTO> getAll(@PathVariable("userId") String userId){
        return listService.getAllLists(userId)
                .switchIfEmpty(
                        Mono.error(new ResponseStatusException(HttpStatus.NO_CONTENT))
                );
    }
    
    /*@GetMapping(LIST_PATH_ID)
    Mono<ListDTO> getListByID(@PathVariable("listId") String listId){
        return listService.getListById(listId);
    }*/
    
    @PostMapping(LIST_PATH)
    Mono<ListDTO> newList(@RequestBody @Validated ListDTO listDTO){
        return listService.createList(listDTO);
    }
    
    @PutMapping(LIST_PATH_ID)
    Mono<ListDTO> updateList(@PathVariable("listId") String listId,
                             @RequestBody @Validated ListDTO listDTO){
        return listService.updateList(listId, listDTO)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }
    
    @DeleteMapping(LIST_PATH_ID)
    Mono<Void> deleteList(@PathVariable("listId") String listId){
        return listService.getListById(listId)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .flatMap(foundList -> listService.deleteList(foundList.getId()));
    }
    
}
