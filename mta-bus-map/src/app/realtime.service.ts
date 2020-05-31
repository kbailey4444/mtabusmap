import { Injectable } from '@angular/core';
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const fs = require('fs');

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private vehiclePositions: any[], private tripUpdates: any[]) {
    fs.readFile('../../../data/testVehicleFile.json', 'utf8', (err, vehicleData) => {
      if (err) { throw err; }
      const vehicles = JSON.parse(vehicleData);
      const vehicleFeed = GtfsRealtimeBindings.transit_realtime.FeedMessage.create(vehicles);
      vehicleFeed.entity.forEach((entity) => {
        if (entity.vehicle) {
          const vehiclePosition = GtfsRealtimeBindings.transit_realtime.VehiclePosition.create(entity);
          this.vehiclePositions.push(vehiclePosition);
        }
      });
    });
    fs.readFile('../../../data/testTripFile.json', 'utf8', (err, tripData) => {
      if (err) { throw err; }
      const trips = JSON.parse(tripData);
      const tripFeed = GtfsRealtimeBindings.transit_realtime.FeedMessage.create(trips);
      tripFeed.entity.forEach((entity) => {
        if (entity.tripUpdate) {
          const tripUpdate = GtfsRealtimeBindings.transit_realtime.TripUpdate.create(entity);
          this.tripUpdates.push(tripUpdate);
        }
      });
    });
  }

  getVehiclePositions() {
    return this.vehiclePositions;
  }

  getTripUpdates() {
    return this.tripUpdates;
  }
}
