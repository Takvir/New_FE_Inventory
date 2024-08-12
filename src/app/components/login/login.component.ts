// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

interface User {
  password: string;
  type: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  username: string = '';
  password: string = '';
  error: string | null = null;




   constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void { }




 
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        // Successful login
        this.error = null;
        this.router.navigate(['/equipment']); // Redirect to the protected route
      },
      error: (err) => {
        // Failed login
        this.error = 'Invalid credentials';
      }
    });
  }
}
