import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map/map.service';
import { GeoJson, FeatureCollection } from '../map';
@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit{
  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 48;
  lng = -122.41;
  message = 'Hello World!';
  // data
  source: any;
  markers: any;
  constructor(private mapService: MapService) {
  }
  ngOnInit() {
    this.markers = this.mapService.getMarkers().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.initializeMap()
  }
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        // const newMarker = new GeoJson([this.lng,this.lat], { message: "test" })
        // this.mapService.createMarker(newMarker)
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }
    this.buildMap()
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add Marker on Click
    // this.map.on('click', (event) => {
    //   const coordinates = [event.lngLat.lng, event.lngLat.lat]
    //   const newMarker   = new GeoJson(coordinates, { message: this.message })
    //   this.mapService.createMarker(newMarker)
    // })
    
    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {
      /// register source
      this.map.addSource('firebase', {
         type: 'geojson',
         data: {
           type: 'FeatureCollection',
           features: []
         },
         cluster: true,
         clusterMaxZoom: 14, // Max zoom to cluster points on
         clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
      /// get source
      this.source = this.map.getSource('firebase')
      /// subscribe to realtime database and set data source
      this.markers.subscribe(markers => {
          let data = new FeatureCollection(markers)
          this.source.setData(data)
      })
      /// create map layers with realtime data
      this.map.on('click', 'unclustered-point',  (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.message)
            .addTo(this.map);
      });

      this.map.on('click', 'clusters',  (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML("There are " + e.features[0].properties.point_count_abbreviated + " points!")
            .addTo(this.map);
      });

      this.map.addLayer({
        id: "clusters",
        type: "circle",
        source: "firebase",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": {
                property: "point_count",
                type: "interval", 
                stops: [
                    [0, "#51bbd6"],
                    [100, "#f1f075"],
                    [750, "#f28cb1"],
                ]
            },
            "circle-radius": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, 20],
                    [100, 30],
                    [750, 40]
                ]
            }
        }
    });

    this.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "firebase",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    this.map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "firebase",
        filter: ["!has", "point_count"],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 12,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });
    })
  }
  /// Helpers
  removeMarker(marker) {
    this.mapService.removeMarker(marker.key)
  }
  flyTo(data: GeoJson) {

    this.map.flyTo({
      center: data.geometry.coordinates
    })
    let it = new mapboxgl.Popup()
    .setLngLat(data.geometry.coordinates)
    .setHTML(data.properties.message)
    .addTo(this.map);
    setTimeout(()=>{
      it.remove();
    },2000)
     

  }
}