import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthResponse, LoginDto, RegisterDto } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_KEY = 'smartretail_auth';
  currentUser = signal<AuthResponse | null>(this.loadFromStorage());

  constructor(private http: HttpClient, private router: Router) {}

  private loadFromStorage(): AuthResponse | null {
    const stored = localStorage.getItem(this.AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, dto).pipe(
      tap(res => this.saveUser(res))
    );
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, dto).pipe(
      tap(res => this.saveUser(res))
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private saveUser(res: AuthResponse): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(res));
    this.currentUser.set(res);
  }

  get token(): string | null { return this.currentUser()?.token ?? null; }
  get role(): string | null { return this.currentUser()?.role ?? null; }
  get isLoggedIn(): boolean { return !!this.token; }
  get isAdmin(): boolean { return this.role === 'Admin'; }
  get isCustomer(): boolean { return this.role === 'Customer'; }
}