import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';

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

    <div class="content-container">
      <router-outlet></router-outlet>
    </div>
    <app-bottom-nav></app-bottom-nav>
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
    }
  `]
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
