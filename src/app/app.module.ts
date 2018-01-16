// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.route';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from './shared/shared.module';
import { MomentModule } from 'angular2-moment';

// components
import { AppComponent } from './app.component';
// services
import { AuthService } from './services/auth/auth.service';
import { MapService } from './services/map/map.service';

// others
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { MapBoxComponent } from './map-box/map-box.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapBoxComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    MomentModule
  ],
  providers: [
    AuthService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
