package com.cabnest.service;

import com.cabnest.entity.Driver;
import com.cabnest.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public Driver registerDriver(Driver driver) {
        // Check if driver already exists
        Optional<Driver> existingDriver = driverRepository.findByEmail(driver.getEmail());
        if (existingDriver.isPresent()) {
            throw new RuntimeException("Driver with this email already exists");
        }

        return driverRepository.save(driver);
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public List<Driver> getAvailableDrivers() {
        return driverRepository.findByAvailable(true);
    }

    public List<Driver> getDriversByVehicleType(String vehicleType) {
        return driverRepository.findByAvailableAndVehicleType(true, vehicleType);
    }

    public Optional<Driver> getDriverById(Long id) {
        return driverRepository.findById(id);
    }

    public Driver updateDriverAvailability(Long id, Boolean available) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setAvailable(available);
        return driverRepository.save(driver);
    }

    public Driver updateDriver(Long id, Driver driverDetails) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setName(driverDetails.getName());
        driver.setPhone(driverDetails.getPhone());
        driver.setVehicleType(driverDetails.getVehicleType());
        driver.setVehicleNumber(driverDetails.getVehicleNumber());
        driver.setLicenseNumber(driverDetails.getLicenseNumber());

        return driverRepository.save(driver);
    }

    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }
}
