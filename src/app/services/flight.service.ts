import { Injectable } from '@angular/core';
import { Flight, SearchParams, Booking } from '../models/flight.model';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private mockFlights: Flight[] = [
    {
      id: 'f1', airline: 'IndiGo', airlineCode: '6E', logo: '✈️',
      from: 'Mumbai', fromCode: 'BOM', to: 'Delhi', toCode: 'DEL',
      departure: '06:00', arrival: '08:10', duration: '2h 10m',
      stops: 0, price: 4599, seats: 12, class: 'Economy'
    },
    {
      id: 'f2', airline: 'Air India', airlineCode: 'AI', logo: '🛫',
      from: 'Mumbai', fromCode: 'BOM', to: 'Delhi', toCode: 'DEL',
      departure: '09:30', arrival: '11:50', duration: '2h 20m',
      stops: 0, price: 5999, seats: 5, class: 'Economy'
    },
    {
      id: 'f3', airline: 'SpiceJet', airlineCode: 'SG', logo: '🌶️',
      from: 'Mumbai', fromCode: 'BOM', to: 'Delhi', toCode: 'DEL',
      departure: '13:15', arrival: '15:30', duration: '2h 15m',
      stops: 0, price: 3899, seats: 20, class: 'Economy'
    },
    {
      id: 'f4', airline: 'Vistara', airlineCode: 'UK', logo: '💫',
      from: 'Mumbai', fromCode: 'BOM', to: 'Delhi', toCode: 'DEL',
      departure: '16:45', arrival: '19:00', duration: '2h 15m',
      stops: 0, price: 7500, seats: 8, class: 'Business'
    },
    {
      id: 'f5', airline: 'IndiGo', airlineCode: '6E', logo: '✈️',
      from: 'Delhi', fromCode: 'DEL', to: 'Bangalore', toCode: 'BLR',
      departure: '07:00', arrival: '09:30', duration: '2h 30m',
      stops: 0, price: 5200, seats: 15, class: 'Economy'
    },
    {
      id: 'f6', airline: 'Air India', airlineCode: 'AI', logo: '🛫',
      from: 'Delhi', fromCode: 'DEL', to: 'Bangalore', toCode: 'BLR',
      departure: '11:00', arrival: '13:45', duration: '2h 45m',
      stops: 0, price: 6100, seats: 3, class: 'Economy'
    },
    {
      id: 'f7', airline: 'GoFirst', airlineCode: 'G8', logo: '🚀',
      from: 'Hyderabad', fromCode: 'HYD', to: 'Mumbai', toCode: 'BOM',
      departure: '08:30', arrival: '10:15', duration: '1h 45m',
      stops: 0, price: 3499, seats: 18, class: 'Economy'
    },
    {
      id: 'f8', airline: 'Vistara', airlineCode: 'UK', logo: '💫',
      from: 'Chennai', fromCode: 'MAA', to: 'Delhi', toCode: 'DEL',
      departure: '14:00', arrival: '16:30', duration: '2h 30m',
      stops: 0, price: 6800, seats: 6, class: 'Economy'
    }
  ];

  searchFlights(params: SearchParams): Flight[] {
    return this.mockFlights.filter(f =>
      f.from.toLowerCase().includes(params.from.toLowerCase()) &&
      f.to.toLowerCase().includes(params.to.toLowerCase())
    );
  }

  getAllFlights(): Flight[] {
    return this.mockFlights;
  }

  getFlightById(id: string): Flight | undefined {
    return this.mockFlights.find(f => f.id === id);
  }

  saveBooking(booking: Booking): void {
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }

  getBookings(): Booking[] {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }

  cancelBooking(id: string): void {
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    const idx = bookings.findIndex(b => b.id === id);
    if (idx > -1) {
      bookings[idx].status = 'cancelled';
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  }
}
