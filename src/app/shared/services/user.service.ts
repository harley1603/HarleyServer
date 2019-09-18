import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { }

  getListOfUsers() {
    return this.db.collection('/user').get();
  }

  getUserDataByUid(uid: string){
    return this.db.collection(`/user`).doc(uid).get();
  }

  async updateUserByUid(uid:string, data: any, role?) {
    try {
      await this.db.collection(`/user`).doc(uid).set({
        first_name: data.firstName,
        last_name: data.lastName,
        display_name: data.displayName ? data.displayName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phoneNumber,
        birthday: data.birthday ? data.birthday : '' ,
        role: role || 2
      });
      await this.afAuth.auth.currentUser.updateProfile({
        displayName: data.displayName ? data.displayName: data.firstName + " " + data.lastName
      });
    } catch (error) {
      console.log(error);
    }
  }
}
