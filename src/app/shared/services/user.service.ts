import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new User();
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { }

  getListOfUsers() {
    return this.db.collection('/user').snapshotChanges();
  }

  getUserDataByUid(uid: string) {
    return this.db.collection(`/user`).doc(uid).get();
  }

  async updateUserByUid(uid: string, data: User, role?) {
    try {
      await this.db.collection(`/user`).doc(uid).set({
        first_name: data.first_name,
        last_name: data.last_name,
        display_name: data.display_name ? data.display_name : data.first_name + " " + data.last_name,
        email: data.email,
        phone: data.phone || '',
        birthday: data.birthday ? data.birthday : '',
        shipping_address: data.shipping_address ? data.shipping_address.map((address) => Object.assign({}, address)) : [],
        role: +role || 2,
        status: data.status || 'Active'
      });
      if (uid === this.afAuth.auth.currentUser.uid) {
        await this.afAuth.auth.currentUser.updateProfile({
          displayName: data.display_name ? data.display_name : data.first_name + " " + data.last_name
        });
      }
    } catch (error) {
      throw error;
    }
  }

  activeUser(uid: string, user: any) {
    return this.db.collection('/user').doc(uid).update({
      status: 'Active'
    })
  }

  blockUser(uid: string, user: any) {
    return this.db.collection('/user').doc(uid).update({
      status: 'Blocked'
    })
  }
}
