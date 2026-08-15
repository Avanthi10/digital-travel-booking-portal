import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content fade-in">
          <span class="hero-tag">✈ Trusted by 2M+ Travelers</span>
          <h1>Explore the World<br>Your Way</h1>
          <p>Book flights instantly. Best prices guaranteed.<br>Your next adventure is one click away.</p>
          <div class="hero-actions">
            <a routerLink="/search" class="btn-primary" *ngIf="isLoggedIn">
              <i class="fas fa-search"></i> Search Flights
            </a>
            <a routerLink="/register" class="btn-primary" *ngIf="!isLoggedIn">
              <i class="fas fa-rocket"></i> Get Started Free
            </a>
            <a routerLink="/login" class="btn-hero-secondary" *ngIf="!isLoggedIn">Sign In</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>500+</strong><span>Destinations</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><strong>50+</strong><span>Airlines</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><strong>2M+</strong><span>Bookings</span></div>
          </div>
        </div>
        <div class="hero-card fade-in">
          <div class="plane-animation">✈️</div>
          <div class="floating-card card1">
            <span>🏖️</span>
            <div>
              <strong>Goa</strong>
              <p>From ₹2,999</p>
            </div>
          </div>
          <div class="floating-card card2">
            <span>🗼</span>
            <div>
              <strong>Paris</strong>
              <p>From ₹42,000</p>
            </div>
          </div>
          <div class="floating-card card3">
            <span>🏯</span>
            <div>
              <strong>Tokyo</strong>
              <p>From ₹55,000</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Destinations -->
      <section class="destinations">
        <div class="section-header">
          <h2>Popular Destinations</h2>
          <p>Handpicked destinations for every traveler</p>
        </div>
        <div class="dest-grid">
          <div class="dest-card" *ngFor="let dest of destinations">
            <div class="dest-emoji">{{ dest.emoji }}</div>
            <div class="dest-info">
              <h3>{{ dest.city }}</h3>
              <p>{{ dest.country }}</p>
              <span class="dest-price">From ₹{{ dest.price | number }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features">
        <div class="section-header">
          <h2>Why Choose SkyWay?</h2>
          <p>Everything you need for the perfect trip</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" *ngFor="let f of features">
            <div class="feature-icon">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section" *ngIf="!isLoggedIn">
        <div class="cta-content">
          <h2>Ready to Take Off?</h2>
          <p>Join millions of happy travelers. Sign up free today!</p>
          <a routerLink="/register" class="btn-primary">
            <i class="fas fa-paper-plane"></i> Start Your Journey
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home { }

    /* HERO */
    .hero {
      background: linear-gradient(135deg, #0a2342 0%, #1a3a6e 60%, #0d4080 100%);
      min-height: 88vh;
      display: flex;
      align-items: center;
      padding: 60px 80px;
      position: relative;
      overflow: hidden;
      gap: 60px;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .hero-content { flex: 1; z-index: 1; }
    .hero-tag {
      display: inline-block;
      background: rgba(232,168,56,0.2);
      color: #e8a838;
      padding: 6px 16px;
      border-radius: 50px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 20px;
      border: 1px solid rgba(232,168,56,0.3);
    }
    .hero-content h1 {
      font-size: 58px;
      color: #fff;
      line-height: 1.1;
      margin-bottom: 20px;
      font-family: 'Playfair Display', serif;
    }
    .hero-content p {
      color: rgba(255,255,255,0.75);
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 36px;
    }
    .hero-actions { display: flex; gap: 16px; margin-bottom: 48px; }
    .btn-hero-secondary {
      background: transparent;
      color: #fff;
      border: 2px solid rgba(255,255,255,0.4);
      padding: 12px 28px;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .btn-hero-secondary:hover { background: rgba(255,255,255,0.1); }
    .hero-stats { display: flex; align-items: center; gap: 28px; }
    .stat { color: #fff; }
    .stat strong { display: block; font-size: 26px; font-family: 'Playfair Display', serif; color: #e8a838; }
    .stat span { font-size: 13px; color: rgba(255,255,255,0.6); }
    .stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.2); }

    /* floating cards */
    .hero-card { position: relative; flex: 0 0 340px; height: 340px; z-index: 1; }
    .plane-animation { font-size: 120px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: float 3s ease-in-out infinite; }
    @keyframes float { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-16px)} }
    .floating-card {
      position: absolute;
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 16px;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #fff;
      animation: float 3s ease-in-out infinite;
    }
    .floating-card span { font-size: 28px; }
    .floating-card strong { display: block; font-size: 15px; }
    .floating-card p { font-size: 12px; color: #e8a838; margin: 0; }
    .card1 { top: 10px; left: 0; animation-delay: 0s; }
    .card2 { top: 40%; right: 0; animation-delay: 0.8s; }
    .card3 { bottom: 20px; left: 20px; animation-delay: 1.6s; }

    /* SECTIONS */
    .destinations, .features { padding: 80px 80px; }
    .section-header { text-align: center; margin-bottom: 50px; }
    .section-header h2 { font-size: 38px; color: #0a2342; margin-bottom: 10px; }
    .section-header p { color: #6b7a99; font-size: 17px; }

    .dest-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 24px;
    }
    .dest-card {
      background: #fff;
      border-radius: 16px;
      padding: 28px 20px;
      text-align: center;
      box-shadow: 0 4px 24px rgba(10,35,66,0.08);
      cursor: pointer;
      transition: all 0.3s;
    }
    .dest-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(10,35,66,0.15); }
    .dest-emoji { font-size: 48px; margin-bottom: 12px; }
    .dest-info h3 { font-size: 18px; color: #0a2342; margin-bottom: 4px; font-family: 'Playfair Display', serif; }
    .dest-info p { color: #6b7a99; font-size: 13px; margin-bottom: 10px; }
    .dest-price { background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 50px; font-size: 13px; font-weight: 600; }

    .features { background: #f4f7fb; }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 28px;
    }
    .feature-card {
      background: #fff;
      border-radius: 16px;
      padding: 32px 24px;
      text-align: center;
      box-shadow: 0 4px 24px rgba(10,35,66,0.07);
      transition: transform 0.3s;
    }
    .feature-card:hover { transform: translateY(-4px); }
    .feature-icon { font-size: 42px; margin-bottom: 16px; }
    .feature-card h3 { color: #0a2342; font-size: 17px; margin-bottom: 10px; font-family: 'Playfair Display', serif; }
    .feature-card p { color: #6b7a99; font-size: 14px; line-height: 1.6; }

    .cta-section {
      background: linear-gradient(135deg, #e8a838, #f5c66a);
      padding: 80px;
      text-align: center;
    }
    .cta-content h2 { font-size: 40px; color: #0a2342; margin-bottom: 14px; }
    .cta-content p { color: #0a2342; font-size: 17px; margin-bottom: 32px; opacity: 0.8; }
  `]
})
export class HomeComponent {
  get isLoggedIn() { return this.auth.isLoggedIn(); }

  destinations = [
    { emoji: '🏖️', city: 'Goa', country: 'India', price: 2999 },
    { emoji: '🗼', city: 'Paris', country: 'France', price: 42000 },
    { emoji: '🏯', city: 'Tokyo', country: 'Japan', price: 55000 },
    { emoji: '🗽', city: 'New York', country: 'USA', price: 48000 },
    { emoji: '🏔️', city: 'Manali', country: 'India', price: 3500 },
    { emoji: '🌴', city: 'Bali', country: 'Indonesia', price: 22000 },
  ];

  features = [
    { icon: '💰', title: 'Best Price Guarantee', desc: 'We match any price. Find it cheaper elsewhere, we\'ll refund the difference.' },
    { icon: '⚡', title: 'Instant Booking', desc: 'Book your flight in under 2 minutes. Confirmation sent immediately.' },
    { icon: '🔒', title: 'Secure Payments', desc: '100% secure checkout with encrypted payment gateway.' },
    { icon: '📱', title: '24/7 Support', desc: 'Our travel experts are always available to assist you.' },
  ];

  constructor(private auth: AuthService) {}
}
