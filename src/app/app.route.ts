import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { MapBoxComponent } from './map-box/map-box.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'max', component: MapBoxComponent },  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}