import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicGestureConfig } from './utils/IonicGestureConfig';

import { Device } from '@ionic-native/device/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    ReactiveFormsModule,
    BrowserModule, IonicModule.forRoot(),
    AppRoutingModule, HttpClientModule, CoreModule],
  providers:
  [
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
