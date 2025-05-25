import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Teeth Spa</span>
      <span class="spacer"></span>
      <button mat-icon-button *ngIf="isLoggedIn" (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
      </button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" [opened]="isLoggedIn">
        <mat-nav-list>
          <a mat-list-item routerLink="/upload" *ngIf="isLoggedIn">
            <mat-icon matListItemIcon>cloud_upload</mat-icon>
            <span matListItemTitle>Завантаження файлів</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
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
    mat-sidenav-container {
      flex: 1;
    }
    mat-sidenav {
      width: 250px;
    }
    .content {
      padding: 20px;
      height: 100%;
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
