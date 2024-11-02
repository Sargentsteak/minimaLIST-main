package com.minimalist.todolist.mappers;

import com.minimalist.todolist.entities.List;
import com.minimalist.todolist.model.ListDTO;
import org.mapstruct.Mapper;

@Mapper
public interface ListMapper {
    
    List listDtoToList(ListDTO listDTO);
    
    ListDTO listToListDTO(List list);
    
}
