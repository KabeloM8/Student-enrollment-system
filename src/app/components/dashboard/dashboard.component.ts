import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courses: any;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    console.log('isLoggedIn', this.firebaseService.isLoggedIn);
    this.courses = this.firebaseService.courses;
    console.log('courses', this.courses);
  }

}
