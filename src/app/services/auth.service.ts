import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Тимчасово: перевіряємо хардкодовані облікові дані
    if (username === 'admin' && password === 'password') {
      localStorage.setItem(this.AUTH_KEY, 'true');
      this.isLoggedInSubject.next(true);
      this.router.navigate(['/upload']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }




  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}
