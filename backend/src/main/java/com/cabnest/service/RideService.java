package com.cabnest.service;

import com.cabnest.entity.Driver;
import com.cabnest.entity.Ride;
import com.cabnest.repository.DriverRepository;
import com.cabnest.repository.RideRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final DriverRepository driverRepository;
    private final Random random = new Random();

    public RideService(RideRepository rideRepository, DriverRepository driverRepository) {
        this.rideRepository = rideRepository;
        this.driverRepository = driverRepository;
    }

    public Ride bookRide(Ride ride) {
        ride.setStatus("BOOKED");

        // Calculate fare if not provided
        if (ride.getFare() == null) {
            ride.setFare(calculateFare(ride));
        }

        // Calculate estimated time (random between 10-45 minutes for demo)
        if (ride.getEstimatedTime() == null) {
            ride.setEstimatedTime(10 + random.nextInt(35));
        }

        // Auto-assign available driver if not specified
        if (ride.getDriverId() == null) {
            assignDriver(ride);
        }

        return rideRepository.save(ride);
    }

    private Double calculateFare(Ride ride) {
        // Simple fare calculation (random between 100 and 500 for demo)
        // In production, this would use distance, time, surge pricing, etc.
        return 100 + random.nextDouble() * 400;
    }

    private void assignDriver(Ride ride) {
        // Find available drivers
        List<Driver> availableDrivers = driverRepository.findByAvailable(true);

        if (!availableDrivers.isEmpty()) {
            // Assign first available driver (in production, use better matching logic)
            Driver driver = availableDrivers.get(random.nextInt(availableDrivers.size()));
            ride.setDriverId(driver.getId());
        }
    }

    public List<Ride> getRidesByUser(Long userId) {
        // Sort by created date descending (newest first)
        return rideRepository.findByUserId(userId);
    }

    public List<Ride> getAllRides() {
        return rideRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<Ride> getRidesByDriver(Long driverId) {
        return rideRepository.findByDriverId(driverId);
    }

    public Optional<Ride> getRideById(Long id) {
        return rideRepository.findById(id);
    }

    public Ride updateRideStatus(Long id, String status) {
        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        ride.setStatus(status);
        return rideRepository.save(ride);
    }

    public void deleteRide(Long id) {
        rideRepository.deleteById(id);
    }
}
