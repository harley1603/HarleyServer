import { ROLE } from '../enums/role.enum';
import { Injectable } from '@angular/core';
import { Address } from './address';

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
    status: string;
    role: ROLE;
    avatar: string;
    shipping_address: Address[];
    content: Object[] = [];
    // User(uid? : string, 
    //     display_name? : string, 
    //     first_name? : string, 
    //     last_name? : string, 
    //     phone? : string, 
    //     email? : string, 
    //     birthday? : string, 
    //     address? : string, 
    //     user_role? : ROLE, 
    //     avatar? : string) {
    //     this.uid = uid;
    //     this.display_name = display_name;
    //     this.first_name = first_name;
    //     this.last_name = last_name;
    //     this.phone = phone;
    //     this.email = email;
    //     this.birthday = birthday;
    //     this.address = address;
    //     this.user_role = user_role;
    //     this.avatar = avatar;
    // }

    setUser(user: any) {
        this.display_name = user.displayName;
        this.email = user.email;
        this.uid = user.uid;
        this.phone = user.phoneNumber;
        this.avatar = user.photoURL;
    }

    setUserDetail(user: any){
        this.display_name = user && user.display_name ? user.display_name : this.display_name;
        this.email = user.email ? user.email : this.email;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.birthday = user.birthday;
        this.uid = user.uid ? user.uid : this.uid;
        this.phone = user.phone ? user.phone : this.phone;
        this.status = user.status ? user.status : 'Blocked';
        this.avatar = user.photo_url ? user.photo_url : this.avatar ? this.avatar : '';
        this.role = user.role ? user.role : this.role;
        this.shipping_address = user.shipping_address ? Object.keys(user.shipping_address).map(key => user.shipping_address[key] ) : [];
        let roleTitle = '';
        switch (this.role) {
            case ROLE.ADMIN:
                roleTitle = 'Admin';
                break;
            case ROLE.CUSTOMER:
                roleTitle = 'Customer';
                break;
            case ROLE.USER:
                roleTitle = 'User';
                break;
            default:
                break;
        }
        this.content = [
            { title: user.uid ? user.uid : this.uid},
            { title: user.first_name },
            { title: user.last_name },
            { title: user.email ? user.email : this.email },
            { title: user.phone ? user.phone : this.phone },
            { 
                title: user.status ? user.status : 'Blocked',
                status: true
            },
            { title: roleTitle },
        ];
    }

    setEmpty(){
        this.display_name = '';
        this.uid = '';
        this.phone = '';
        this.avatar = '';
    }
}