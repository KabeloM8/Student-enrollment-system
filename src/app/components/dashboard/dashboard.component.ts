import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courses: any;
  user: any;
  application: any;

  constructor(
    public firebaseService: FirebaseService,
    public afs: AngularFirestore,
    public ngZone: NgZone
    ) { }

  ngOnInit(): void {
    console.log('isLoggedIn', this.firebaseService.isLoggedIn);
    this.courses = this.firebaseService.courses;
    this.GetUserInfo();

    this.afs.collection('users').ref.where('uid', '==', this.firebaseService.userData.uid)
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.ngZone.run(() => {
            this.user = change.doc.data();
          });
        }
        if (change.type === "modified") {
          this.ngZone.run(() => {
            this.user = change.doc.data();
          });
        }
      });
    });

    this.afs.collection('applications').ref.where('applicantId', '==', this.firebaseService.userData.uid)
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.ngZone.run(() => {
            this.application = change.doc.data();
          });
        }
        if (change.type === "modified") {
          console.log('modified');

          this.ngZone.run(() => {
            this.application = change.doc.data();
          });
        }
      });
    });
  }

  GetUserInfo() {
    this.afs.doc(`users/${this.firebaseService.userData.uid}`).ref.get().then(doc => {
      this.ngZone.run(() => {
        this.user = doc.data();
      });
      console.log('userInfo', this.user);
    }).catch(error => {
      console.log(error);
    })
  }

  applyCourse(index: any) {
    this.firebaseService.SetApplication(this.courses[index], this.user);
  }
}
