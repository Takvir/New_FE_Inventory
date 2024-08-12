import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false; // Example flag for authentication status

  constructor(private router: Router) {}

  // Check if the user is authenticated
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Log in a user (replace with your actual authentication logic)
  login(username: string, password: string): boolean {
    // Example authentication logic
    if (username === 'superadmin' && password === '@MMBL2024') {
      this.isAuthenticated = true;
      this.router.navigate(['/equipment']); // Redirect to a protected route
      return true;
    } else {
      return false;
    }
  }

  // Log out a user
  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/sign-in']);
  }
}
