package com.cabnest.repository;

import com.cabnest.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    List<Driver> findByAvailable(Boolean available);

    List<Driver> findByVehicleType(String vehicleType);

    Optional<Driver> findByEmail(String email);

    List<Driver> findByAvailableAndVehicleType(Boolean available, String vehicleType);
}
