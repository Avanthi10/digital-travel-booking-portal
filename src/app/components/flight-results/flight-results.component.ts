import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-results',
  standalone: true,
imports: [CommonModule, FormsModule],
  template: `
    <div class="results-page">
      <div class="results-header">
        <div class="route-info">
          <span class="city">{{ from }}</span>
          <span class="arrow">✈ ──────</span>
          <span class="city">{{ to }}</span>
        </div>
        <div class="trip-meta">
          <span>📅 {{ date }}</span>
          <span>👥 {{ passengers }} Passenger(s)</span>
          <span>💺 {{ travelClass }}</span>
          <span class="results-count">{{ flights.length }} flights found</span>
        </div>
      </div>

      <div class="results-container">
        <!-- Filters -->
        <aside class="filters">
          <h3>Filter Results</h3>
          <div class="filter-section">
            <h4>Sort By</h4>
            <label *ngFor="let s of sortOptions">
              <input type="radio" name="sort" [value]="s.value" [(ngModel)]="sortBy" (change)="applySort()">
              {{ s.label }}
            </label>
          </div>
          <div class="filter-section">
            <h4>Max Price</h4>
            <input type="range" [(ngModel)]="maxPrice" min="1000" max="20000" step="500" (input)="applyFilters()">
            <span>₹{{ maxPrice | number }}</span>
          </div>
          <div class="filter-section">
            <h4>Stops</h4>
            <label>
              <input type="checkbox" [(ngModel)]="onlyNonstop" (change)="applyFilters()"> Non-stop only
            </label>
          </div>
        </aside>

        <!-- Flight Cards -->
        <div class="flights-list">
          <div *ngIf="filteredFlights.length === 0" class="no-results">
            <div class="no-results-icon">✈️</div>
            <h3>No flights found</h3>
            <p>Try a different route or date.</p>
          </div>

          <div class="flight-card fade-in" *ngFor="let flight of filteredFlights">
            <div class="airline-info">
              <span class="airline-logo">{{ flight.logo }}</span>
              <div>
                <strong>{{ flight.airline }}</strong>
                <span class="flight-code">{{ flight.airlineCode }}</span>
              </div>
            </div>

            <div class="flight-timing">
              <div class="time-block">
                <span class="time">{{ flight.departure }}</span>
                <span class="code">{{ flight.fromCode }}</span>
              </div>
              <div class="duration-block">
                <span class="duration">{{ flight.duration }}</span>
                <div class="line"></div>
                <span class="stops">{{ flight.stops === 0 ? 'Non-stop' : flight.stops + ' stop(s)' }}</span>
              </div>
              <div class="time-block">
                <span class="time">{{ flight.arrival }}</span>
                <span class="code">{{ flight.toCode }}</span>
              </div>
            </div>

            <div class="flight-class">
              <span class="badge" [class.badge-success]="flight.class === 'Economy'" [class.badge-warning]="flight.class === 'Business'">
                {{ flight.class }}
              </span>
              <span class="seats">{{ flight.seats }} seats left</span>
            </div>

            <div class="flight-price">
              <div class="price">₹{{ (flight.price * passengers) | number }}</div>
              <small>₹{{ flight.price | number }} per person</small>
              <button class="btn-book" (click)="bookFlight(flight)">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .results-page { background: #f4f7fb; min-height: calc(100vh - 70px); }
    .results-header {
      background: linear-gradient(135deg, #0a2342, #1a3a6e);
      padding: 30px 60px; color: #fff;
    }
    .route-info { display: flex; align-items: center; gap: 20px; margin-bottom: 14px; }
    .city { font-size: 32px; font-family: 'Playfair Display', serif; font-weight: 700; }
    .arrow { color: #e8a838; font-size: 20px; }
    .trip-meta { display: flex; gap: 24px; font-size: 14px; color: rgba(255,255,255,0.75); flex-wrap: wrap; }
    .results-count { background: #e8a838; color: #0a2342; padding: 2px 12px; border-radius: 50px; font-weight: 600; }

    .results-container { display: flex; gap: 28px; padding: 32px 60px; max-width: 1100px; margin: 0 auto; }

    .filters { flex: 0 0 220px; background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 24px rgba(10,35,66,0.08); height: fit-content; }
    .filters h3 { font-size: 17px; color: #0a2342; margin-bottom: 20px; font-family: 'Playfair Display', serif; }
    .filter-section { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0; }
    .filter-section:last-child { border-bottom: none; }
    .filter-section h4 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7a99; margin-bottom: 12px; }
    .filter-section label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #0a2342; margin-bottom: 8px; cursor: pointer; }
    .filter-section input[type=range] { width: 100%; accent-color: #e8a838; margin-bottom: 6px; }
    .filter-section span { font-size: 13px; font-weight: 600; color: #0a2342; }

    .flights-list { flex: 1; display: flex; flex-direction: column; gap: 16px; }
    .no-results { text-align: center; padding: 60px; background: #fff; border-radius: 16px; }
    .no-results-icon { font-size: 56px; margin-bottom: 16px; }
    .no-results h3 { color: #0a2342; margin-bottom: 8px; font-family: 'Playfair Display', serif; }
    .no-results p { color: #6b7a99; }

    .flight-card {
      background: #fff; border-radius: 16px; padding: 24px 28px;
      box-shadow: 0 4px 24px rgba(10,35,66,0.07);
      display: flex; align-items: center; gap: 24px;
      transition: all 0.3s; border: 2px solid transparent;
    }
    .flight-card:hover { border-color: #e8a838; box-shadow: 0 8px 32px rgba(10,35,66,0.12); }

    .airline-info { flex: 0 0 120px; display: flex; align-items: center; gap: 10px; }
    .airline-logo { font-size: 28px; }
    .airline-info strong { display: block; font-size: 14px; color: #0a2342; }
    .flight-code { font-size: 12px; color: #6b7a99; }

    .flight-timing { flex: 1; display: flex; align-items: center; gap: 20px; }
    .time-block { text-align: center; }
    .time { display: block; font-size: 24px; font-weight: 700; color: #0a2342; font-family: 'Playfair Display', serif; }
    .code { font-size: 13px; color: #6b7a99; }
    .duration-block { flex: 1; text-align: center; }
    .duration { font-size: 13px; color: #6b7a99; display: block; margin-bottom: 6px; }
    .line { height: 2px; background: linear-gradient(to right, #e2e8f0, #e8a838, #e2e8f0); border-radius: 2px; margin-bottom: 6px; }
    .stops { font-size: 12px; color: #22c55e; font-weight: 600; }

    .flight-class { text-align: center; flex: 0 0 100px; }
    .seats { display: block; font-size: 12px; color: #ef4444; margin-top: 6px; }

    .flight-price { text-align: right; flex: 0 0 140px; }
    .price { font-size: 26px; font-weight: 700; color: #0a2342; font-family: 'Playfair Display', serif; }
    .price + small { font-size: 12px; color: #6b7a99; display: block; margin-bottom: 12px; }
    .btn-book {
      background: #e8a838; color: #0a2342; border: none; padding: 10px 20px;
      border-radius: 50px; font-size: 14px; font-weight: 600; cursor: pointer;
      transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    }
    .btn-book:hover { background: #0a2342; color: #fff; }
  `]
})
export class FlightResultsComponent implements OnInit {
  from = ''; to = ''; date = ''; passengers = 1; travelClass = '';
  flights: Flight[] = []; filteredFlights: Flight[] = [];
  sortBy = 'price'; maxPrice = 20000; onlyNonstop = false;

  sortOptions = [
    { value: 'price', label: 'Price: Low to High' },
    { value: 'duration', label: 'Duration' },
    { value: 'departure', label: 'Departure Time' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private flightService: FlightService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'] || '';
      this.to = params['to'] || '';
      this.date = params['date'] || '';
      this.passengers = +params['passengers'] || 1;
      this.travelClass = params['class'] || 'Economy';
      this.flights = this.flightService.searchFlights({ from: this.from, to: this.to, date: this.date, passengers: this.passengers, travelClass: this.travelClass });
      this.filteredFlights = [...this.flights];
      this.applySort();
    });
  }

  applyFilters() {
    this.filteredFlights = this.flights.filter(f =>
      f.price <= this.maxPrice && (!this.onlyNonstop || f.stops === 0)
    );
    this.applySort();
  }

  applySort() {
    this.filteredFlights.sort((a, b) => {
      if (this.sortBy === 'price') return a.price - b.price;
      if (this.sortBy === 'departure') return a.departure.localeCompare(b.departure);
      return a.duration.localeCompare(b.duration);
    });
  }

  bookFlight(flight: Flight) {
    this.router.navigate(['/booking'], {
      queryParams: { flightId: flight.id, passengers: this.passengers, date: this.date }
    });
  }
}
