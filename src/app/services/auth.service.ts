import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private router: Router) {
    // Перевіряємо, чи користувач вже авторизований
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      this.isAuthenticated.next(true);
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/upload']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}
