package com.minimalist.todolist.services;

import com.minimalist.todolist.mappers.ListMapper;
import com.minimalist.todolist.model.ListDTO;
import com.minimalist.todolist.repositories.ListRepository;

import com.minimalist.todolist.repositories.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ListServiceImpl implements ListService {
    
    private final ListRepository listRepository;
    private final ListMapper listMapper;
    private final TodoRepository todoRepository;
    
    @Override
    public Flux<ListDTO> getAllLists(String userId) {
        return listRepository.findAllByUserIdOrderByIndexAsc(userId)
                .map(list -> {
                    return listMapper.listToListDTO(list);
                });
    }
    
    @Override
    public Mono<ListDTO> getListById(String listId) {
        return listRepository.findById(listId)
                .map(listMapper::listToListDTO);
    }
    
    @Override
    public Mono<ListDTO> createList(ListDTO listDTO) {
        return listRepository.save(listMapper.listDtoToList(listDTO))
                .map(listMapper::listToListDTO);
    }
    
    @Override
    public Mono<ListDTO> updateList(String listId, ListDTO listDTO) {
        return listRepository.findById(listId)
                .map(foundList -> {
                    foundList.setEmoji(listDTO.getEmoji());
                    foundList.setTitle(listDTO.getTitle());
                    foundList.setIndex(listDTO.getIndex());
                    return foundList;
                })
                .flatMap(listRepository::save)
                .map(listMapper::listToListDTO);
    }
    
    @Override
    public Mono<Void> deleteList(String listId) {
        return todoRepository.deleteByListId(listId)
                .then(listRepository.deleteById(listId));
    }
}
