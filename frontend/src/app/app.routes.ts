import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { authGuard, guestGuard } from './guards/auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { UserThemeComponent } from './pages/user-theme/user-theme.component';
import DashboardComponent from './pages/business/dashboard/dashboard.component';

export const routes: Routes = [
  { 
    path: '', 
    title: 'yeah idk',
    component: IndexComponent,
  },

  {
    path: 'login',
    title: 'Login',
    canActivate: [guestGuard],
    component: LoginComponent,
  },
  { 
    path: 'register', 
    title: 'Register', 
    canActivate: [guestGuard],
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [authGuard],
    component: DashboardComponent
  },
  {
    path: 'user',
    title: 'User',
    canActivate: [authGuard],
    component: UserFormComponent
  },
  {
    path: 'user/theme',
    title: 'Theme',
    canActivate: [authGuard],
    component: UserThemeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }


];
