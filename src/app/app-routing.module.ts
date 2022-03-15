import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipsComponent } from './pages/starships/starships.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

const routes: Routes = [
  { path: 'starships', component: StarshipsComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'vehicles', component: VehiclesComponent },
   {path: '', redirectTo: 'starships', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
