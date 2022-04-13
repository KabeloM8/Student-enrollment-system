import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from "../../shared/services/firebase.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log('isLoggedIn', this.firebaseService.isLoggedIn);
    if(this.firebaseService.isLoggedIn === true) {
      console.log('nav to dashboard')
      this.router.navigate(['dashboard']);
    }
  }

}
