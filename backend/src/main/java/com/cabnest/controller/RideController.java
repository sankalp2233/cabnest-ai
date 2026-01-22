package com.cabnest.controller;

import com.cabnest.entity.Ride;
import com.cabnest.service.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/rides")
@CrossOrigin(origins = "*")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping("/book")
    public ResponseEntity<Ride> bookRide(@RequestBody Ride ride) {
        // Set status
        ride.setStatus("BOOKED");

        // Calculate dummy fare (random between 100 and 500)
        double dummyFare = 100 + new Random().nextDouble() * 400;
        ride.setFare(Math.round(dummyFare * 100.0) / 100.0); // Round to 2 decimals

        Ride bookedRide = rideService.bookRide(ride);
        return ResponseEntity.ok(bookedRide);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ride>> getUserRides(@PathVariable Long userId) {
        List<Ride> rides = rideService.getRidesByUser(userId);
        return ResponseEntity.ok(rides);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Ride>> getAllRides() {
        List<Ride> rides = rideService.getAllRides();
        return ResponseEntity.ok(rides);
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Ride>> getDriverRides(@PathVariable Long driverId) {
        List<Ride> rides = rideService.getRidesByDriver(driverId);
        return ResponseEntity.ok(rides);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRideById(@PathVariable Long id) {
        return rideService.getRideById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateRideStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusMap) {
        try {
            String status = statusMap.get("status");
            Ride updatedRide = rideService.updateRideStatus(id, status);
            return ResponseEntity.ok(updatedRide);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRide(@PathVariable Long id) {
        try {
            rideService.deleteRide(id);
            return ResponseEntity.ok(Map.of("message", "Ride deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
