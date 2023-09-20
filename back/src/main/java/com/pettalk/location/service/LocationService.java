package com.pettalk.location.service;


import com.pettalk.location.entity.LocationEntity;
import com.pettalk.location.repository.LocationRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository repository;

    public LocationService(LocationRepository repository) {
        this.repository = repository;
    }

    public LocationEntity saveLocation(LocationEntity location) {
        repository.save(location);
        return location;
    }

    public List<LocationEntity> findAllLocation(Long locationId) {
        return repository.findAllBylocationId(locationId);
//        return repository.findAll(Sort.by("locationId").descending());
    }
}
