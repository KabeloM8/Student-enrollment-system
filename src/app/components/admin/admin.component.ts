import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  applications: Array<any> = []; // Get available courses

  constructor(
    public afs: AngularFirestore,
    public ngZone: NgZone
    ) { }

  ngOnInit(): void {
    this.afs.collection('applications').ref.onSnapshot(snapshot => {
      console.log('listen to applications');

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.ngZone.run(() => {
            let docData: any = change.doc.data();
            this.applications.push({
              ...docData
            });
          });
        }
      });
    })
  }

  accept(index: any): void {
    console.log('index', index);
  }

  reject(index: any): void {
    console.log('index', index);
  }
}
