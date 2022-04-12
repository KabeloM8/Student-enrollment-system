import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    console.log('isLoggedIn', this.authService.isLoggedIn);
  }

  signUp(userEmail: string, userPwd: string) {
    this.authService.SignUp(userEmail, userPwd).then(res => {
      console.log('result', res);
    })
  }

}
