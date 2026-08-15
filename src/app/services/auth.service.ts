import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  private getStoredUser(): User | null {
    const u = localStorage.getItem('currentUser');
    return u ? JSON.parse(u) : null;
  }

  register(name: string, email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
