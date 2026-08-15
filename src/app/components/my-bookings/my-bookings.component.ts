import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Booking } from '../../models/flight.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bookings-page">
      <div class="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage all your travel bookings in one place</p>
      </div>

      <div class="bookings-container">
        <!-- Stats -->
        <div class="booking-stats fade-in">
          <div class="stat-card">
            <div class="stat-icon">✈️</div>
            <div><strong>{{ bookings.length }}</strong><span>Total Trips</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div><strong>{{ confirmedCount }}</strong><span>Confirmed</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div><strong>₹{{ totalSpent | number }}</strong><span>Total Spent</span></div>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="bookings.length === 0">
          <div class="empty-icon">🧳</div>
          <h3>No bookings yet!</h3>
          <p>Your adventures are waiting. Book your first flight today!</p>
          <a routerLink="/search" class="btn-primary">Search Flights</a>
        </div>

        <!-- Bookings List -->
        <div class="bookings-list" *ngIf="bookings.length > 0">
          <div class="booking-card fade-in" *ngFor="let booking of bookings" [class.cancelled]="booking.status === 'cancelled'">
            <div class="booking-top">
              <div class="booking-id">
                <span class="id-label">Booking ID</span>
                <strong>{{ booking.id }}</strong>
              </div>
              <span class="status-badge"
                [class.badge-success]="booking.status === 'confirmed'"
                [class.badge-danger]="booking.status === 'cancelled'"
                [class.badge-warning]="booking.status === 'pending'">
                {{ booking.status | titlecase }}
              </span>
            </div>

            <div class="booking-route">
              <div class="route-city">
                <span class="route-time">{{ booking.flight.departure }}</span>
                <span class="route-name">{{ booking.flight.from }}</span>
                <span class="route-code">{{ booking.flight.fromCode }}</span>
              </div>
              <div class="route-mid">
                <span class="airline-name">{{ booking.flight.airline }}</span>
                <div class="route-line">✈ ──────────</div>
                <span class="route-duration">{{ booking.flight.duration }}</span>
              </div>
              <div class="route-city">
                <span class="route-time">{{ booking.flight.arrival }}</span>
                <span class="route-name">{{ booking.flight.to }}</span>
                <span class="route-code">{{ booking.flight.toCode }}</span>
              </div>
            </div>

            <div class="booking-footer">
              <div class="booking-meta">
                <span>📅 Booked on: {{ booking.bookedOn }}</span>
                <span>👥 {{ booking.passengers }} passenger(s)</span>
                <span>👤 {{ booking.passengerName }}</span>
              </div>
              <div class="booking-price-actions">
                <span class="booking-price">₹{{ booking.totalPrice | number }}</span>
                <button class="btn-cancel"
                  *ngIf="booking.status !== 'cancelled'"
                  (click)="cancelBooking(booking.id)">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="search-more" *ngIf="bookings.length > 0">
          <a routerLink="/search" class="btn-primary">
            <i class="fas fa-plus"></i> Book Another Flight
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bookings-page { background: #f4f7fb; min-height: calc(100vh - 70px); }
    .bookings-header {
      background: linear-gradient(135deg, #0a2342, #1a3a6e);
      padding: 50px 80px; color: #fff; text-align: center;
    }
    .bookings-header h1 { font-size: 44px; font-family: 'Playfair Display', serif; margin-bottom: 10px; }
    .bookings-header p { color: rgba(255,255,255,0.7); font-size: 16px; }

    .bookings-container { max-width: 900px; margin: 0 auto; padding: 40px 24px 60px; }

    .booking-stats { display: flex; gap: 20px; margin-bottom: 36px; }
    .stat-card {
      flex: 1; background: #fff; border-radius: 14px; padding: 20px 24px;
      box-shadow: 0 4px 24px rgba(10,35,66,0.08); display: flex; align-items: center; gap: 16px;
    }
    .stat-icon { font-size: 32px; }
    .stat-card strong { display: block; font-size: 22px; font-weight: 700; color: #0a2342; font-family: 'Playfair Display', serif; }
    .stat-card span { font-size: 13px; color: #6b7a99; }

    .empty-state { text-align: center; background: #fff; border-radius: 20px; padding: 80px 40px; box-shadow: 0 4px 24px rgba(10,35,66,0.08); }
    .empty-icon { font-size: 72px; margin-bottom: 20px; }
    .empty-state h3 { font-size: 26px; color: #0a2342; margin-bottom: 10px; font-family: 'Playfair Display', serif; }
    .empty-state p { color: #6b7a99; font-size: 16px; margin-bottom: 28px; }

    .bookings-list { display: flex; flex-direction: column; gap: 20px; }
    .booking-card {
      background: #fff; border-radius: 16px; padding: 28px;
      box-shadow: 0 4px 24px rgba(10,35,66,0.08); border-left: 4px solid #22c55e;
      transition: all 0.3s;
    }
    .booking-card.cancelled { border-left-color: #ef4444; opacity: 0.75; }
    .booking-card:hover { transform: translateY(-2px); }

    .booking-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .booking-id { display: flex; flex-direction: column; }
    .id-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7a99; margin-bottom: 2px; }
    .booking-id strong { font-size: 15px; color: #0a2342; }
    .status-badge { padding: 5px 14px; border-radius: 50px; font-size: 13px; font-weight: 600; }
    .badge-success { background: #dcfce7; color: #15803d; }
    .badge-danger { background: #fee2e2; color: #b91c1c; }
    .badge-warning { background: #fef9c3; color: #a16207; }

    .booking-route { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; padding: 20px; background: #f8fafc; border-radius: 12px; }
    .route-city { text-align: center; flex: 0 0 120px; }
    .route-time { display: block; font-size: 26px; font-weight: 700; color: #0a2342; font-family: 'Playfair Display', serif; }
    .route-name { display: block; font-size: 13px; color: #0a2342; font-weight: 500; }
    .route-code { font-size: 12px; color: #6b7a99; }
    .route-mid { flex: 1; text-align: center; }
    .airline-name { font-size: 13px; color: #6b7a99; display: block; margin-bottom: 6px; }
    .route-line { font-size: 18px; color: #e8a838; margin-bottom: 4px; }
    .route-duration { font-size: 12px; color: #6b7a99; }

    .booking-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f0f0f0; padding-top: 16px; }
    .booking-meta { display: flex; gap: 20px; font-size: 13px; color: #6b7a99; flex-wrap: wrap; }
    .booking-price-actions { display: flex; align-items: center; gap: 16px; }
    .booking-price { font-size: 22px; font-weight: 700; color: #0a2342; font-family: 'Playfair Display', serif; }
    .btn-cancel {
      background: transparent; color: #ef4444; border: 1px solid #ef4444;
      padding: 7px 16px; border-radius: 50px; font-size: 13px; cursor: pointer;
      transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    }
    .btn-cancel:hover { background: #ef4444; color: #fff; }
    .search-more { text-align: center; margin-top: 36px; }
  `]
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  confirmedCount = 0;
  totalSpent = 0;

  constructor(private flightService: FlightService) {}

  ngOnInit() { this.loadBookings(); }

  loadBookings() {
    this.bookings = this.flightService.getBookings();
    this.confirmedCount = this.bookings.filter(b => b.status === 'confirmed').length;
    this.totalSpent = this.bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.totalPrice, 0);
  }

  cancelBooking(id: string) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.flightService.cancelBooking(id);
      this.loadBookings();
    }
  }
}
