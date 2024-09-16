import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { authGuard, guestGuard } from './guards/auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { LeafetMapComponent } from './components/leafet-map/leafet-map.component';

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
    path: 'user',
    title: 'User',
    canActivate: [authGuard],
    component: UserComponent
  },
  {
    path: 'map',
    title: 'Map',
    component: LeafetMapComponent
  },

  {
    path: '**',
    redirectTo: ''
  }


];
