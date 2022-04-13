import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userData: any; // Save logged in user data
  courses: Array<Object> = []; // Get available courses
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        this.userData = null;
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    for(let i = 1; i<=4; i++) {
      this.afs.collection('courses').doc(`course${i}`).ref.get().then(doc => {
        let docData: any = doc.data();
        this.courses.push({
          courseId: docData.docId,
          courseName: docData.courseName,
          description: docData.description
        });
      })
    }
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        this.router.navigate(['user-profile']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null) ? true : false;
  }
  /* Getting user data when user logs in */
  GetUserRef() {
    return this.afs.doc(`users/${this.userData.uid}`);
  }
  /* Setting up user data when user saves details */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      name: user.name,
      surname: user.surname,
      dob: user.dob,
      phone: user.phone,
      idNo: user.idNo,
      gender: user.gender,
      role: user.role,
      created: true,
      studentId: Date.now().toString(),
    };

    userRef.ref.get().then(doc => {
      if(doc.exists) {
        if(user.uid) {
          userRef.ref.update({
            uid: user.uid
          })
        }
        if(user.email) {
          userRef.ref.update({
            email: user.email,
          })
        }
        if(user.photoURL) {
          userRef.ref.update({
            photoURL: user.photoURL,
          })
        }
        if(user.name) {
          userRef.ref.update({
            name: user.name
          })
        }
        if(user.surname) {
          userRef.ref.update({
            surname: user.surname
          })
        }
        if(user.dob) {
          userRef.ref.update({
            dob: user.dob
          })
        }
        if(user.phone) {
          userRef.ref.update({
            phone: user.phone
          })
        }
        if(user.idNo) {
          userRef.ref.update({
            idNo: user.idNo
          })
        }
        if(user.gender) {
          userRef.ref.update({
            gender: user.gender
          })
        }
        if(user.role) {
          userRef.ref.update({
            role: user.role,
          })
        }
        userRef.ref.update({created: true})
        // randomly generate student number
        userRef.ref.update({
          studentId: Date.now().toString()
        })

        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      } else {
        userRef.set(userData, {
          merge: true,
        }).then(() => {
          this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          });
        }).catch(error => {
          window.alert(error);
        });
      }
    }).catch(error => {
      window.alert(error);
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
