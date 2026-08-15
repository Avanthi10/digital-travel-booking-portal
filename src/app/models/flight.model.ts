export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  logo: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  price: number;
  seats: number;
  class: string;
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  passengers: number;
  travelClass: string;
}

export interface Booking {
  id: string;
  flight: Flight;
  passengers: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedOn: string;
  passengerName: string;
  passengerEmail: string;
}
