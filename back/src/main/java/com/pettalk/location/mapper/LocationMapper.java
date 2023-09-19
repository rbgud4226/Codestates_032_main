package com.pettalk.location.mapper;

import com.pettalk.location.entity.LocationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface LocationMapper {

    //    @Mapping(source = "latitude", target = "latitude")
//    @Mapping(source = "longitude", target = "longitude")
    LocationEntity LocationPostDto(com.test.location.dto.LocationDTO.Post postDto);
    com.test.location.dto.LocationDTO.Response LocationResponse(LocationEntity location);
}
