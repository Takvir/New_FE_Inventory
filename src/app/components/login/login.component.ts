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



  // userId: string = '';
  // password: string = '';


  // private readonly USERS: { [key: string]: User } = {
  //   superadmin: { password: '@MMBL2024', type: 'superadmin' },
  //   fad: { password: '@fad2024', type: 'admin' },
  //   gulshan_branch: { password: '@gulshan2024', type: 'branch' }
  // };

   constructor(private authService: AuthService) {}

  ngOnInit(): void { }

  // onLogin(): void {
  //   // Cast userId to a key of USERS type
  //   const user = this.USERS[this.userId];
  //   if (user && user.password === this.password) {
  //     // Store user type in local storage/session storage or any other preferred method
  //     localStorage.setItem('userType', user.type);
  //     console.log(user);
      

  //     // Redirect to /equipment
  //     this.router.navigate(['/equipment']);
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // }


  login() {
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.error = 'Invalid credentials';
    }
  }
}
