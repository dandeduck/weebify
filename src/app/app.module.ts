import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 70,
      subtitle: 'weeb',
      subtitleColor: "white",
      subtitleFontSize: "1rem",
      outerStrokeWidth: 8,
      unitsFontWeight: "bold",
      subtitleFontWeight: "bold",
      outerStrokeColor: "white",
      innerStrokeColor: "#ffb6c1",
      animationDuration: 1000,
      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
