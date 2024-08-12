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


  branchId: string | null = null;
  username: string = '';
  password: string = '';
  error: string | null = null;




   constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.branchId = localStorage.getItem('branch_id');
   }





  // login() {
  //   this.authService.login(this.username, this.password).subscribe({
  //     next: () => {
  //       // Successful login
  //       this.error = null;
  //       this.router.navigate(['/equipment']); // Redirect to the protected route
  //     },
  //     error: (err) => {
  //       // Failed login
  //       this.error = 'Invalid credentials';
  //     }
  //   });
  // }

  // login.component.ts
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Successful login
        this.error = null;
        const userType = localStorage.getItem('user_type');
        const branchId = localStorage.getItem('branch_id');

        console.log('User Type:', userType);
        console.log('Branch ID:', branchId);

        if (userType === 'superadmin') {
          this.router.navigate(['/branch-list']);
        } else if (userType === 'admin') {
          this.router.navigate(['/branch-list']);
        } else if (userType === 'branch') {
          this.router.navigate(['/branch-list']);
        } else {
          this.router.navigate(['/branch-list']); // Fallback route
        }
      },
      error: (err) => {
        // Failed login
        this.error = 'Invalid credentials';
      }
    });
  }

}
