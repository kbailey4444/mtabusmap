import { Injectable } from '@angular/core';
import fs = require('fs');
import csv = require('csv-parser');

@Injectable({
  providedIn: 'root'
})
export class GtfsService {

  constructor(private agency: object, private stops: object, private routes: object, private trips: object,
              private stopTimes: object, private calendar: object, private calendarDates: object,
              private shapes: object, private transfers: object, private pathways: object,
              private levels: object) {
    const fileNames = ['agency.txt', 'stops.txt', 'routes.txt', 'trips.txt', 'stop_times.txt', 'calendar.txt',
                        'calendar_dates.txt', 'shapes.txt', 'transfers.txt', 'pathways.txt'];
    const dataLocation = '../../../data/google_transit/';
    fileNames.forEach((filename) => {
      const obj = JSON.parse(this.convertCsv(`${dataLocation}${filename}`));
      if (filename === 'agency.txt') {
        this.agency = obj;
      } else if (filename === 'stops.txt') {
        this.stops = obj;
      } else if (filename === 'routes.txt') {
        this.routes = obj;
      } else if (filename === 'trips.txt') {
        this.trips = obj;
      } else if (filename === 'stop_times.txt') {
        this.stopTimes = obj;
      } else if (filename === 'calendar.txt') {
        this.calendar = obj;
      } else if (filename === 'calendar_dates.txt') {
        this.calendarDates = obj;
      } else if (filename === 'shapes.txt') {
        this.shapes = obj;
      } else if (filename === 'transfers.txt') {
        this.transfers = obj;
      } else if (filename === 'pathways.txt') {
        this.pathways = obj;
      }
    });
  }

  private covertCsv(filelocation: string): object[] {
    const csvResult: object[];
    fs.createReadStream(filelocation)
      .pipe(csv())
      .on('data', (data) => {
        csvResult.push(data);
      })
      .on('end', () => {
        return csvResult;
      });
  }

  getAgency(): object {
    return this.agency;
  }

  getStops(): object {
    return this.stops;
  }

  getRoutes(): object {
    return this.routes;
  }

  getTrips(): object {
    return this.trips;
  }

  getStopTimes(): object {
    return this.stopTimes;
  }

  getCalendar(): object {
    return this.calendar;
  }

  getCalendarDates(): object {
    return this.calendarDates;
  }

  getShapes(): object {
    return this.shapes;
  }

  getTransfers(): object {
    return this.transfers;
  }

  getPathways(): object {
    return this.pathways;
  }
}
