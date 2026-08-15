import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="auth-page">
      <div class="auth-left">
        <div class="auth-left-content">
          <span class="logo-big">✈</span>
          <h2>Join SkyWay Today</h2>
          <p>Create a free account and start exploring the world with unbeatable flight deals.</p>
          <div class="benefits">
            <div class="benefit"><span>🎁</span> Free to register</div>
            <div class="benefit"><span>💳</span> Exclusive member discounts</div>
            <div class="benefit"><span>📧</span> Booking confirmation on email</div>
            <div class="benefit"><span>🔒</span> 100% secure & private</div>
          </div>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-card fade-in">
          <h1>Create Account</h1>
          <p class="subtitle">Fill in the details to get started</p>

          <div class="alert alert-success" *ngIf="success">
            <i class="fas fa-check-circle"></i> {{ success }}
          </div>
          <div class="alert alert-error" *ngIf="error">
            <i class="fas fa-exclamation-circle"></i> {{ error }}
          </div>

          <form (ngSubmit)="onRegister()">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" [(ngModel)]="name" name="name" placeholder="John Doe" required>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" [(ngModel)]="email" name="email" placeholder="you@example.com" required>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" [(ngModel)]="password" name="password" placeholder="Min. 6 characters" required minlength="6">
            </div>
            <button type="submit" class="btn-primary btn-full" [disabled]="loading">
              <i class="fas fa-user-plus"></i>
              {{ loading ? 'Creating account...' : 'Create Account' }}
            </button>
          </form>

          <p class="auth-switch">
            Already have an account? <a routerLink="/login">Sign in →</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { display: flex; min-height: calc(100vh - 70px); }
    .auth-left {
      flex: 1;
      background: linear-gradient(135deg, #0a2342, #1a3a6e);
      display: flex; align-items: center; justify-content: center; padding: 60px;
    }
    .auth-left-content { color: #fff; max-width: 360px; }
    .logo-big { font-size: 60px; background: #e8a838; padding: 14px 20px; border-radius: 16px; display: inline-block; margin-bottom: 28px; }
    .auth-left-content h2 { font-size: 36px; margin-bottom: 14px; font-family: 'Playfair Display', serif; }
    .auth-left-content p { color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.7; margin-bottom: 32px; }
    .benefits { display: flex; flex-direction: column; gap: 14px; }
    .benefit { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.85); font-size: 15px; }
    .auth-right { flex: 1; display: flex; align-items: center; justify-content: center; background: #f4f7fb; padding: 60px; }
    .auth-card { background: #fff; border-radius: 20px; padding: 48px 44px; box-shadow: 0 8px 40px rgba(10,35,66,0.10); width: 100%; max-width: 420px; }
    .auth-card h1 { font-size: 32px; color: #0a2342; margin-bottom: 8px; }
    .subtitle { color: #6b7a99; font-size: 15px; margin-bottom: 32px; }
    .btn-full { width: 100%; justify-content: center; margin-top: 8px; }
    .auth-switch { text-align: center; margin-top: 24px; color: #6b7a99; font-size: 14px; }
    .auth-switch a { color: #0a2342; font-weight: 600; }
    .alert { padding: 12px 16px; border-radius: 10px; margin-bottom: 20px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
    .alert-error { background: #fee2e2; color: #b91c1c; }
    .alert-success { background: #dcfce7; color: #15803d; }
  `]
})
export class RegisterComponent {
  name = ''; email = ''; password = ''; error = ''; success = ''; loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.error = ''; this.success = '';
    if (this.password.length < 6) { this.error = 'Password must be at least 6 characters.'; return; }
    this.loading = true;
    setTimeout(() => {
      if (this.auth.register(this.name, this.email, this.password)) {
        this.success = 'Account created! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      } else {
        this.error = 'Email already registered. Please login instead.';
      }
      this.loading = false;
    }, 600);
  }
}
