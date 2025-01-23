import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent,
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'user/:userID',
        component:DashboardComponent
    }
];
