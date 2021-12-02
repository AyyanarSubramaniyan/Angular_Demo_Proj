import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { StateDetailsComponent } from './state-details/state-details.component';
  

const routes: Routes = [
  { path: '', redirectTo: '/country', pathMatch: 'full' },
  { path: 'state', component: StateDetailsComponent },
  { path: 'country', component: CountryDetailsComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
