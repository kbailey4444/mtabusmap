import { Component, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import * as olProj from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  map: Map;

  constructor() { }

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
      ],
      view: new View({
        center: olProj.fromLonLat([-76.609383, 39.299236]),
        zoom: 13
      })
    });
    return theMap;
  }
}
