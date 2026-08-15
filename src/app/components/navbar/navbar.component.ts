import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="logo">
          <span class="logo-icon">✈</span>
          <span class="logo-text">Sky<strong>Way</strong></span>
        </a>
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
          <a routerLink="/search" routerLinkActive="active" *ngIf="currentUser">Search Flights</a>
          <a routerLink="/my-bookings" routerLinkActive="active" *ngIf="currentUser">My Bookings</a>
        </div>
        <div class="nav-auth">
          <div class="user-info" *ngIf="currentUser; else authButtons">
            <span class="user-name">👋 {{ currentUser.name }}</span>
            <button class="btn-logout" (click)="logout()">Logout</button>
          </div>
          <ng-template #authButtons>
            <a routerLink="/login" class="btn-nav-login">Login</a>
            <a routerLink="/register" class="btn-nav-register">Register</a>
          </ng-template>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #0a2342;
      padding: 0 40px;
      height: 70px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 20px rgba(0,0,0,0.3);
    }
    .nav-container {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 40px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      color: #fff;
      text-decoration: none;
    }
    .logo-icon {
      font-size: 24px;
      background: #e8a838;
      padding: 6px 10px;
      border-radius: 8px;
    }
    .logo-text strong { color: #e8a838; }
    .nav-links {
      display: flex;
      gap: 28px;
      flex: 1;
    }
    .nav-links a {
      color: rgba(255,255,255,0.75);
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: color 0.2s;
      padding-bottom: 2px;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #e8a838;
      border-bottom: 2px solid #e8a838;
    }
    .nav-auth {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: auto;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .user-name {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
    }
    .btn-nav-login {
      color: #fff;
      border: 1px solid rgba(255,255,255,0.4);
      padding: 7px 18px;
      border-radius: 50px;
      font-size: 14px;
      transition: all 0.2s;
    }
    .btn-nav-login:hover { background: rgba(255,255,255,0.1); }
    .btn-nav-register {
      background: #e8a838;
      color: #0a2342;
      padding: 7px 18px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn-nav-register:hover { background: #f5c66a; }
    .btn-logout {
      background: transparent;
      color: #e8a838;
      border: 1px solid #e8a838;
      padding: 6px 16px;
      border-radius: 50px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-logout:hover { background: #e8a838; color: #0a2342; }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(u => this.currentUser = u);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
