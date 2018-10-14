import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  authState: any;

  get currentUserID(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }
  constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase, private router: Router) {
                  this.user = afAuth.authState;
  }

  login(email: string , password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        const status = 'online';
        this.setUserStatus(status, user.user.uid);
        this.router.navigate(['chat']);
      });
  }

  authUser() {
    return this.user;
  }

  get authstateOfUser() {
    return this.authState;
  }


  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              .then(user => {

                this.authState = user;

                const status = 'online';
                this.setUserData(email, displayName, status);
              }).catch(error => console.log(error));
  }

  setUserData (email: string, displayName: string, status: string) {
    const path = `users/${this.currentUserID}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }

  setUserStatus (status: string, uid: string) {
    const path = `users/${uid}`;
    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }
}
