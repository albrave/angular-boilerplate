import { Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/services/auth.guard.service';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent,
        canActivate: mapToCanActivate([AuthGuard])
    },
    {
        path: 'login',
        component: LoginComponent,
    },];
