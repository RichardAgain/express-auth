import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { authGuard, guestGuard } from './guards/auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { UserThemeComponent } from './pages/user-theme/user-theme.component';
import DashboardComponent from './pages/business/dashboard/dashboard.component';
import { TangramPageComponent } from './pages/tangram-page/tangram-page.component';
import { MediaPageComponent } from './pages/media-page/media-page/media-page.component';

export const routes: Routes = [
  { 
    path: '', 
    title: 'Sonic Page - Home',
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
    path: 'tangram',
    title: 'Tangram',
    canActivate: [authGuard],
    component: TangramPageComponent
  },
  {
    path: 'media',
    title: 'Media',
    canActivate: [authGuard],
    component: MediaPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
