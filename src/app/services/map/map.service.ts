import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase, AngularFireList   } from 'angularfire2/database';
import { GeoJson } from '../../map';
import * as mapboxgl from 'mapbox-gl';
@Injectable()
export class MapService {
  constructor(private db: AngularFireDatabase) {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
  }
  getMarkers(): AngularFireList<any> {
    return this.db.list('/markers')
  }
  createMarker(data: GeoJson) {
    return this.db.list('/markers')
                  .push(data)
  }
  removeMarker(key: string) {
    return this.db.list('/markers').remove(key);
  }
}