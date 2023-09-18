package com.test.location.service;

import com.test.location.entity.LocationEntity;
import com.test.location.mapper.LocationMapper;
import com.test.location.repository.LocationRepository;
import org.springframework.stereotype.Service;

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
}
