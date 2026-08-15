import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="search-page">
      <div class="search-hero">
        <h1>Find Your Perfect Flight</h1>
        <p>Search hundreds of airlines and book with confidence</p>
      </div>

      <div class="search-container fade-in">
        <div class="search-card">
          <div class="trip-tabs">
            <button [class.active]="tripType==='one-way'" (click)="tripType='one-way'">One Way</button>
            <button [class.active]="tripType==='round-trip'" (click)="tripType='round-trip'">Round Trip</button>
          </div>

          <div class="search-fields">
            <div class="field-group">
              <label><i class="fas fa-plane-departure"></i> From</label>
              <select [(ngModel)]="from" name="from">
                <option value="">Select City</option>
                <option *ngFor="let city of cities" [value]="city">{{ city }}</option>
              </select>
            </div>

            <button class="swap-btn" (click)="swapCities()">⇄</button>

            <div class="field-group">
              <label><i class="fas fa-plane-arrival"></i> To</label>
              <select [(ngModel)]="to" name="to">
                <option value="">Select City</option>
                <option *ngFor="let city of cities" [value]="city">{{ city }}</option>
              </select>
            </div>

            <div class="field-group">
              <label><i class="fas fa-calendar"></i> Departure</label>
              <input type="date" [(ngModel)]="date" name="date" [min]="today">
            </div>

            <div class="field-group" *ngIf="tripType==='round-trip'">
              <label><i class="fas fa-calendar-check"></i> Return</label>
              <input type="date" [(ngModel)]="returnDate" name="returnDate" [min]="date">
            </div>

            <div class="field-group">
              <label><i class="fas fa-users"></i> Passengers</label>
              <select [(ngModel)]="passengers" name="passengers">
                <option [value]="1">1 Adult</option>
                <option [value]="2">2 Adults</option>
                <option [value]="3">3 Adults</option>
                <option [value]="4">4 Adults</option>
              </select>
            </div>

            <div class="field-group">
              <label><i class="fas fa-chair"></i> Class</label>
              <select [(ngModel)]="travelClass" name="travelClass">
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First Class</option>
              </select>
            </div>
          </div>

          <button class="btn-search" (click)="onSearch()">
            <i class="fas fa-search"></i> Search Flights
          </button>

          <div class="error-msg" *ngIf="error">{{ error }}</div>
        </div>

        <!-- Popular Routes -->
        <div class="popular-routes">
          <h3>Popular Routes</h3>
          <div class="routes-grid">
            <div class="route-chip" *ngFor="let route of popularRoutes" (click)="fillRoute(route)">
              <span>✈️</span> {{ route.from }} → {{ route.to }}
              <small>From ₹{{ route.price | number }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-page { background: #f4f7fb; min-height: calc(100vh - 70px); }
    .search-hero {
      background: linear-gradient(135deg, #0a2342, #1a3a6e);
      padding: 60px 80px 80px;
      text-align: center;
    }
    .search-hero h1 { font-size: 44px; color: #fff; margin-bottom: 12px; font-family: 'Playfair Display', serif; }
    .search-hero p { color: rgba(255,255,255,0.7); font-size: 17px; }

    .search-container { max-width: 900px; margin: -40px auto 60px; padding: 0 24px; }
    .search-card { background: #fff; border-radius: 20px; padding: 36px; box-shadow: 0 12px 48px rgba(10,35,66,0.15); }

    .trip-tabs { display: flex; gap: 8px; margin-bottom: 28px; }
    .trip-tabs button {
      padding: 8px 22px; border-radius: 50px; border: 2px solid #e2e8f0;
      background: transparent; cursor: pointer; font-size: 14px; font-weight: 500;
      color: #6b7a99; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    }
    .trip-tabs button.active { background: #0a2342; color: #fff; border-color: #0a2342; }

    .search-fields {
      display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end; margin-bottom: 24px;
    }
    .field-group { flex: 1; min-width: 140px; }
    .field-group label { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #6b7a99; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .field-group select, .field-group input {
      width: 100%; padding: 12px 14px; border: 2px solid #e2e8f0; border-radius: 10px;
      font-size: 15px; color: #0a2342; background: #fff; outline: none; transition: border-color 0.2s;
      font-family: 'DM Sans', sans-serif;
    }
    .field-group select:focus, .field-group input:focus { border-color: #e8a838; }

    .swap-btn {
      width: 40px; height: 40px; border-radius: 50%; border: 2px solid #e2e8f0;
      background: #fff; cursor: pointer; font-size: 18px; display: flex;
      align-items: center; justify-content: center; transition: all 0.2s; align-self: flex-end;
      margin-bottom: 2px;
    }
    .swap-btn:hover { background: #0a2342; color: #fff; border-color: #0a2342; }

    .btn-search {
      width: 100%; padding: 16px; background: #0a2342; color: #fff;
      border: none; border-radius: 12px; font-size: 17px; font-weight: 600;
      cursor: pointer; transition: all 0.3s; display: flex; align-items: center;
      justify-content: center; gap: 10px; font-family: 'DM Sans', sans-serif;
    }
    .btn-search:hover { background: #e8a838; color: #0a2342; }
    .error-msg { color: #ef4444; margin-top: 12px; font-size: 14px; text-align: center; }

    .popular-routes { margin-top: 32px; }
    .popular-routes h3 { font-size: 18px; color: #0a2342; margin-bottom: 16px; font-family: 'Playfair Display', serif; }
    .routes-grid { display: flex; flex-wrap: wrap; gap: 12px; }
    .route-chip {
      background: #fff; border: 2px solid #e2e8f0; border-radius: 50px;
      padding: 10px 20px; cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; gap: 8px; font-size: 14px; color: #0a2342;
    }
    .route-chip small { color: #e8a838; font-weight: 600; }
    .route-chip:hover { border-color: #e8a838; background: #fffbf0; }
  `]
})
export class SearchComponent {
  from = ''; to = ''; date = ''; returnDate = '';
  passengers = 1; travelClass = 'Economy'; tripType = 'one-way'; error = '';
  today = new Date().toISOString().split('T')[0];

  cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Goa', 'Pune', 'Jaipur'];

  popularRoutes = [
    { from: 'Mumbai', to: 'Delhi', price: 3899 },
    { from: 'Delhi', to: 'Bangalore', price: 4200 },
    { from: 'Hyderabad', to: 'Mumbai', price: 3499 },
    { from: 'Chennai', to: 'Delhi', price: 5100 },
  ];

  constructor(private router: Router) {}

  swapCities() { [this.from, this.to] = [this.to, this.from]; }

  fillRoute(route: any) {
    this.from = route.from;
    this.to = route.to;
  }

  onSearch() {
    this.error = '';
    if (!this.from || !this.to) { this.error = 'Please select both departure and destination cities.'; return; }
    if (this.from === this.to) { this.error = 'Departure and destination cannot be the same.'; return; }
    if (!this.date) { this.error = 'Please select a departure date.'; return; }

    this.router.navigate(['/results'], {
      queryParams: { from: this.from, to: this.to, date: this.date, passengers: this.passengers, class: this.travelClass }
    });
  }
}
