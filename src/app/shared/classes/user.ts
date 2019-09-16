import { ROLE } from '../enums/role.enum';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class User {
    uid: string;
    display_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    birthday: string;
    address: string;
    user_role: ROLE;
    avatar: string
    setUser(user: any) {
        this.display_name = user.displayName;
        this.email = user.email;
        this.uid = user.uid;
        this.phone = user.phoneNumber;
        this.avatar = user.photoURL;
    }

    setUserDetail(user: any){
        this.display_name = user.display_name ? user.display_name : this.display_name;
        this.email = user.email ? user.email : this.email;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.birthday = user.birthday;
        this.uid = user.uid ? user.uid : this.uid;
        this.phone = user.phone ? user.phone : this.phone;
        this.avatar = user.photo_url ? user.photo_url : this.avatar;
        this.user_role = user.role ? user.role : this.user_role;
    }

    setEmpty(){
        this.display_name = '';
        this.uid = '';
        this.phone = '';
        this.avatar = '';
    }
}