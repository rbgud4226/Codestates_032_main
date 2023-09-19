package com.pettalk.location.service;


import com.pettalk.location.entity.LocationEntity;
import com.pettalk.location.repository.LocationRepository;
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
