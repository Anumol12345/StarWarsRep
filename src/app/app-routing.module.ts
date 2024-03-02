import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsComponent } from './components/planets/planets.component';
import { ResidentsComponent } from './components/residents/residents.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
  path:"planets",
  component:PlanetsComponent
},
{
  path:"residents",
  component:ResidentsComponent
}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
