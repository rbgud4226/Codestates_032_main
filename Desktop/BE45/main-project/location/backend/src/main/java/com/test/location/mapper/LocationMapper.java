package com.test.location.mapper;

import com.test.location.dto.LocationDTO;
import com.test.location.entity.LocationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface LocationMapper {

//    @Mapping(source = "latitude", target = "latitude")
//    @Mapping(source = "longitude", target = "longitude")
    LocationEntity LocationPostDto(LocationDTO.Post postDto);
    LocationDTO.Response LocationResponse(LocationEntity location);
}
