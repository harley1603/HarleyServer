import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = new User();
        this.user.setUser(user);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
        this.user = null;
      }
    })
  }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  login(email: string, password: string) {
    try {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  signUp(email: string, password: string) {
    try {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  changePassword(email: string, oldPassword: string, newPassword: string) {
    try {
      // return this.login(email, oldPassword).then( () => {
      //   return this.afAuth.auth.currentUser.updatePassword(newPassword);
      // });
      let credentail = auth.EmailAuthProvider.credential(email, oldPassword);
      return this.afAuth.auth.currentUser.reauthenticateWithCredential(credentail)
        .then(result => this.afAuth.auth.currentUser.updatePassword(newPassword));
    } catch (err) {
      console.error(err);
    }
  }
}
