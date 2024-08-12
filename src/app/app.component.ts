import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory_fe';

  reportOpen = false;
  navOpen = false;

  isLoginPage = false;
  branchId: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.branchId = localStorage.getItem('branch_id');
    console.log(this.branchId);


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects === '/sign-in';
      }
    });
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  toggleReport() {
    this.reportOpen = !this.reportOpen;
  }

  signOut(){
    this.router.navigate(['/sign-in']);
  }

}
