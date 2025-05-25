import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: true,
  imports: [MatIconModule, RouterModule]
})
export class BottomNavComponent {
  constructor(private router: Router) {}

  logout() {
    // Додайте логіку виходу тут
    this.router.navigate(['/login']);
  }
} 