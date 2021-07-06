import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { LandingComponent } from './landing/landing.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
    { path: 'weebinator', component: ResultsComponent },
    { path: 'login', component: LandingComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
