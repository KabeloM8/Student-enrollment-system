import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courses: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log('isLoggedIn', this.authService.isLoggedIn);
    this.courses = this.authService.courses;
    console.log('courses', this.courses);
  }

}
