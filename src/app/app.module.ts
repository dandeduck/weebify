import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ResultsComponent } from './results/results.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 70,
      subtitle: 'weeb',
      subtitleColor: "#ffb6c1",
      subtitleFontSize: "1rem",
      outerStrokeWidth: 8,
      unitsFontWeight: "bold",
      subtitleFontWeight: "bold",
      outerStrokeColor: "#ffb6c1",
      innerStrokeColor: "white",
      animationDuration: 1000,
      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
