import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../shared/services/firebase.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

}
