import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';


export const routes: Routes = [
    {path:'doctor',component:DoctorComponent},
    {path:'contact',component:ContactComponent},
    {path:'home',component:HomeComponent}
];

