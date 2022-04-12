import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails = {
    name: '',
    surname: '',
    dob: null,
    gender: '',
    phone: '',
    idNo: ''
  }
  studentForm = this.formBuilder.group({
    name: '',
    surname: '',
    dob: null,
    gender: '',
    phone: '',
    idNo: ''
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {
    console.log('isLoggedIn', this.authService.isLoggedIn);
    const userRef = this.authService.GetUserRef();
    userRef.ref.get().then(doc => {
      if(doc.exists) {
        this.ngZone.run(() => {
          console.log('data', doc.data());
          let docData: any = doc.data();
          this.userDetails.name = docData.name;
          this.userDetails.surname = docData.surname;
          this.userDetails.dob = docData.dob;
          this.userDetails.gender = docData.gender;
          this.userDetails.phone = docData.phone;
          this.userDetails.idNo = docData.idNo;
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  onSubmit(): void {
    const userDetails = {
      uid: this.authService.userData.uid,
      email: this.authService.userData.email,
      photoURL: this.authService.userData.photoURL,
      role: 'student',
      ...this.studentForm.value
    }

    this.authService.SetUserData(userDetails);
  }
}
