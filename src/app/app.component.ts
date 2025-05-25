import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BottomNavComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Teeth Spa</span>
      <span class="spacer"></span>
      <button mat-icon-button *ngIf="isLoggedIn" (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
      </button>
    </mat-toolbar>

    <div class="content-container" [class.logged-out]="!isLoggedIn">
      <router-outlet></router-outlet>
    </div>
    <app-bottom-nav *ngIf="isLoggedIn"></app-bottom-nav>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .content-container {
      flex: 1;
      padding: 20px;
      background-color: #f5f5f5;
      padding-bottom: 56px;
    }
    .content-container.logged-out {
      padding-bottom: 20px;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Спочатку перевіряємо поточний стан авторизації
    this.isLoggedIn = this.authService.isAuthenticated();
    
    // Потім підписуємося на зміни
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
