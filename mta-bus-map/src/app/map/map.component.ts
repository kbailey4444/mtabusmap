import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RealtimeService } from '../realtime.service';
import {Map, View, Feature} from 'ol';
import * as olProj from 'ol/proj';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {XYZ, Vector as VectorSource} from 'ol/source';
import Point from 'ol/geom/Point';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  map: Map;
  vectorSource: VectorSource = new VectorSource();
  vectorLayer: VectorLayer = new VectorLayer({source: this.vectorSource});
  vehicleFeatures: Feature[] = [];
  vehicles: any;

  constructor(private realtimeService: RealtimeService) { }

  ngOnInit(): void {
    this.realtimeService.getVehicles().subscribe(obj => {
      this.vehicles = obj;
      this.createVehicleFeatures();
    });
  }

  ngAfterViewInit(): void {
    this.map = this.createMap();
  }

  createMap(): Map {
    const theMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Topo_Map/MapServer">ArcGIS</a>',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
          })
        })
      ,
      this.vectorLayer],
      view: new View({
        center: olProj.fromLonLat([-76.609383, 39.299236]),
        zoom: 13
      })
    });
    return theMap;
  }

  createVehicleFeatures(): void {
    Object.keys(this.vehicles).forEach((key) => {
      const featProps: any = new Object();
      const lon: number = this.vehicles[key]?.vehicle?.position?.longitude;
      const lat: number = this.vehicles[key]?.vehicle?.position?.latitude;
      featProps.geometry = new Point(olProj.fromLonLat([lon, lat]), 'XY');
      const feat = new Feature(featProps);
      feat.setId('v_' + key);
      this.vehicleFeatures.push(feat);
      this.vectorSource.addFeature(feat);
    });
  }
}
