import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any> {
    const vehicles =
    this.http.get<any>('assets/data/testVehicleFile.json').pipe(map(
      (data => {
      const vehiclesDict = new Object();
      data.entity.forEach((entity) => {
        if (entity.vehicle) {
          vehiclesDict[entity.id] = entity;
        }
      });
      return vehiclesDict;
      })
    ));
    return vehicles;
  }

  getTripUpdates(): Observable<any> {
    return  this.http.get<any>('assets/data/testTripFile.json');
  }
}
