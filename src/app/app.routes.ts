import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'upload', 
    component: FileUploadComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
