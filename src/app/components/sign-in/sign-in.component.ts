import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from "../../shared/services/firebase.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

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

  signUp(userEmail: string, userPwd: string) {
    this.firebaseService.SignUp(userEmail, userPwd).then(res => {
      console.log('result', res);
    })
  }

}
