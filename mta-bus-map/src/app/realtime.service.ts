import { Injectable } from '@angular/core';
import GtfsRealtimeBindings = require('gtfs-realtime-bindings');
import fs = require('fs');

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private vehiclePositions: VehiclePosition[], private tripUpdates: TripUpdate[]) {
    fs.readFile('../../../data/testVehicleFile.json', 'utf8', (err, vehicleData) => {
      if (err) { throw err; }
    });
    fs.readFile('../../../data/testTripFile.json', 'utf8', (err, tripData) => {
      if (err) { throw err; }
    });
    let vehicles = JSON.parse(vehicleData);
    let trips = JSON.parse(tripData);

    let vehicleFeed = GtfsRealtimeBindings.transit_realtime.FeedMessage.create(vehicles);
    vehicleFeed.entity.forEach((entity) => {
      if (entity.vehicle) {
        let vehiclePostion = GtfsRealtimeBindings.transit_realtime.VehiclePosition.create(entity);
        this.vehiclePositions.push(vehiclePosition);
      }
    });
    let tripFeed = GtfsRealtimeBindings.transit_realtime.FeedMessage.create(trips);
    tripFeed.entity.forEach((entity) => {
      if (entity.tripUpdate) {
        let tripUpdate = GtfsRealtimeBindings.transit_realtime.TripUpdate.create(entity);
        this.tripUpdates.push(vehiclePosition);
      }
    });
  }

  getVehiclePositions(): VehiclePostion[] {
    return this.vehiclePositions;
  }

  getTripUpdates(): TripUpdate[] {
    return this.tripUpdates;
  }
}
