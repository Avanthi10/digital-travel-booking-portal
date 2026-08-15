import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { FlightResultsComponent } from './components/flight-results/flight-results.component';
import { BookingComponent } from './components/booking/booking.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'results', component: FlightResultsComponent, canActivate: [authGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
