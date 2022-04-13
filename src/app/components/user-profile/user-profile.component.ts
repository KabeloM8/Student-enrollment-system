import { Component, NgZone, OnInit } from '@angular/core';
import { FirebaseService } from "../../shared/services/firebase.service";
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails = {
    name: null,
    surname: null,
    dob: null,
    gender: null,
    phone: null,
    idNo: null,
    created: false
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
    private firebaseService: FirebaseService,
    public ngZone: NgZone,
    public router: Router,
  ) { }

  ngOnInit(): void {
    console.log('isLoggedIn', this.firebaseService.isLoggedIn);

    const userRef = this.firebaseService.GetUserRef();
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
          this.userDetails.created = docData.created;
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  onSubmit(): void {
    const userDetails = {
      uid: this.firebaseService.userData.uid,
      email: this.firebaseService.userData.email,
      photoURL: this.firebaseService.userData.photoURL,
      role: 'student',
      ...this.studentForm.value
    }

    this.firebaseService.SetUserData(userDetails);
  }
}
