import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { AuthService } from '../../services/auth.service';
import { Flight, Booking } from '../../models/flight.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="booking-page">
      <div class="booking-header">
        <h1>Complete Your Booking</h1>
        <p>You're just one step away from your journey!</p>
      </div>

      <div class="booking-container fade-in" *ngIf="flight">
        <!-- Flight Summary -->
        <div class="flight-summary card">
          <h3>✈ Flight Summary</h3>
          <div class="summary-route">
            <div class="sum-city">
              <span class="big-time">{{ flight.departure }}</span>
              <span class="city-name">{{ flight.from }} ({{ flight.fromCode }})</span>
            </div>
            <div class="sum-mid">
              <span>{{ flight.duration }}</span>
              <div class="sum-line"></div>
              <span class="nonstop">Non-stop</span>
            </div>
            <div class="sum-city">
              <span class="big-time">{{ flight.arrival }}</span>
              <span class="city-name">{{ flight.to }} ({{ flight.toCode }})</span>
            </div>
          </div>
          <div class="summary-details">
            <div class="detail"><span>Airline</span><strong>{{ flight.airline }}</strong></div>
            <div class="detail"><span>Date</span><strong>{{ date }}</strong></div>
            <div class="detail"><span>Passengers</span><strong>{{ passengers }}</strong></div>
            <div class="detail"><span>Class</span><strong>{{ flight.class }}</strong></div>
          </div>
        </div>

        <!-- Passenger Details -->
        <div class="passenger-form card">
          <h3>👤 Passenger Details</h3>
          <div class="form-row">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" [(ngModel)]="passengerName" placeholder="As per ID proof">
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" [(ngModel)]="passengerEmail" placeholder="Confirmation will be sent here">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" [(ngModel)]="phone" placeholder="+91 98765 43210">
            </div>
            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" [(ngModel)]="dob">
            </div>
          </div>
        </div>

        <!-- Payment -->
        <div class="payment-card card">
          <h3>💳 Payment Details</h3>
          <div class="form-row">
            <div class="form-group wide">
              <label>Card Number</label>
              <input type="text" [(ngModel)]="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Expiry Date</label>
              <input type="text" [(ngModel)]="expiry" placeholder="MM/YY" maxlength="5">
            </div>
            <div class="form-group">
              <label>CVV</label>
              <input type="password" [(ngModel)]="cvv" placeholder="123" maxlength="3">
            </div>
            <div class="form-group">
              <label>Name on Card</label>
              <input type="text" [(ngModel)]="cardName" placeholder="John Doe">
            </div>
          </div>
        </div>

        <!-- Price Breakdown -->
        <div class="price-breakdown card">
          <h3>🧾 Price Breakdown</h3>
          <div class="price-row"><span>Base fare ({{ passengers }} × ₹{{ flight.price | number }})</span><span>₹{{ flight.price * passengers | number }}</span></div>
          <div class="price-row"><span>Taxes & Fees (18%)</span><span>₹{{ taxes | number }}</span></div>
          <div class="price-row"><span>Convenience Fee</span><span>₹199</span></div>
          <div class="price-row total"><span>Total Amount</span><span>₹{{ totalAmount | number }}</span></div>

          <div class="error-msg" *ngIf="error">{{ error }}</div>
          <div class="success-msg" *ngIf="success">{{ success }}</div>

          <button class="btn-confirm" (click)="confirmBooking()" [disabled]="loading">
            <i class="fas fa-check-circle"></i>
            {{ loading ? 'Processing...' : 'Confirm & Pay ₹' + (totalAmount | number) }}
          </button>
          <p class="secure-note">🔒 Your payment is 100% secure and encrypted</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .booking-page { background: #f4f7fb; min-height: calc(100vh - 70px); }
    .booking-header {
      background: linear-gradient(135deg, #0a2342, #1a3a6e);
      padding: 40px 60px; color: #fff; text-align: center;
    }
    .booking-header h1 { font-size: 38px; font-family: 'Playfair Display', serif; margin-bottom: 8px; }
    .booking-header p { color: rgba(255,255,255,0.7); }

    .booking-container { max-width: 820px; margin: 32px auto 60px; padding: 0 24px; display: flex; flex-direction: column; gap: 24px; }
    .card { background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 4px 24px rgba(10,35,66,0.08); }
    .card h3 { font-size: 18px; color: #0a2342; margin-bottom: 24px; font-family: 'Playfair Display', serif; }

    .summary-route { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; }
    .sum-city { text-align: center; flex: 0 0 160px; }
    .big-time { display: block; font-size: 30px; font-weight: 700; color: #0a2342; font-family: 'Playfair Display', serif; }
    .city-name { font-size: 13px; color: #6b7a99; }
    .sum-mid { flex: 1; text-align: center; font-size: 13px; color: #6b7a99; }
    .sum-line { height: 2px; background: linear-gradient(to right, #e2e8f0, #e8a838, #e2e8f0); margin: 6px 0; }
    .nonstop { color: #22c55e; font-weight: 600; font-size: 12px; }
    .summary-details { display: flex; gap: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    .detail { flex: 1; }
    .detail span { display: block; font-size: 12px; color: #6b7a99; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .detail strong { font-size: 15px; color: #0a2342; }

    .form-row { display: flex; gap: 16px; margin-bottom: 16px; }
    .form-group { flex: 1; }
    .form-group.wide { flex: 2; }
    .form-group label { display: block; font-size: 12px; font-weight: 600; color: #6b7a99; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .form-group input {
      width: 100%; padding: 12px 14px; border: 2px solid #e2e8f0; border-radius: 10px;
      font-size: 15px; color: #0a2342; outline: none; transition: border-color 0.2s;
      font-family: 'DM Sans', sans-serif;
    }
    .form-group input:focus { border-color: #e8a838; }

    .price-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #6b7a99; }
    .price-row.total { border-bottom: none; padding-top: 16px; font-size: 20px; font-weight: 700; color: #0a2342; border-top: 2px solid #0a2342; }

    .btn-confirm {
      width: 100%; padding: 18px; background: #e8a838; color: #0a2342; border: none;
      border-radius: 12px; font-size: 17px; font-weight: 700; cursor: pointer;
      transition: all 0.3s; margin-top: 20px; display: flex; align-items: center;
      justify-content: center; gap: 10px; font-family: 'DM Sans', sans-serif;
    }
    .btn-confirm:hover { background: #0a2342; color: #fff; }
    .btn-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
    .secure-note { text-align: center; color: #6b7a99; font-size: 13px; margin-top: 12px; }
    .error-msg { color: #ef4444; font-size: 14px; margin-top: 12px; }
    .success-msg { color: #15803d; font-size: 14px; margin-top: 12px; background: #dcfce7; padding: 10px; border-radius: 8px; }
  `]
})
export class BookingComponent implements OnInit {
  flight: Flight | undefined;
  date = ''; passengers = 1;
  passengerName = ''; passengerEmail = ''; phone = ''; dob = '';
  cardNumber = ''; expiry = ''; cvv = ''; cardName = '';
  error = ''; success = ''; loading = false;
  taxes = 0; totalAmount = 0;

  constructor(private route: ActivatedRoute, private router: Router,
    private flightService: FlightService, private auth: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.flight = this.flightService.getFlightById(params['flightId']);
      this.passengers = +params['passengers'] || 1;
      this.date = params['date'] || '';
      if (this.flight) {
        this.taxes = Math.round(this.flight.price * this.passengers * 0.18);
        this.totalAmount = this.flight.price * this.passengers + this.taxes + 199;
      }
      const user = this.auth.getCurrentUser();
      if (user) { this.passengerName = user.name; this.passengerEmail = user.email; }
    });
  }

  confirmBooking() {
    this.error = '';
    if (!this.passengerName || !this.passengerEmail || !this.phone) { this.error = 'Please fill in all passenger details.'; return; }
    if (!this.cardNumber || !this.expiry || !this.cvv || !this.cardName) { this.error = 'Please fill in all payment details.'; return; }
    this.loading = true;
    setTimeout(() => {
      const booking: Booking = {
        id: 'BK' + Date.now(),
        flight: this.flight!,
        passengers: this.passengers,
        totalPrice: this.totalAmount,
        status: 'confirmed',
        bookedOn: new Date().toLocaleDateString(),
        passengerName: this.passengerName,
        passengerEmail: this.passengerEmail
      };
      this.flightService.saveBooking(booking);
      this.success = '🎉 Booking confirmed! Redirecting to your bookings...';
      this.loading = false;
      setTimeout(() => this.router.navigate(['/my-bookings']), 2000);
    }, 1500);
  }
}
