import { Injectable } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { IProfile } from '../types/iprofile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user: IProfile;

  constructor() { }

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            age: 30,
            email: ''
          };
          this.user.email = this.user.firstName + '.' + this.user.lastName + '@blueface.com';
          resolve(this.user);
          
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 5000);
    });
  }

  setName(firstName: string, lastName:string, user: IProfile) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = user;
          this.user.firstName = firstName;
          this.user.lastName = lastName;
          resolve(this.user);
        } else {
          reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    });
  }

  setEmail(user: IProfile) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = user;
          user.email = user.firstName + '.' + user.lastName + '@blueface.com'
          resolve(this.user);
        } else {
          reject({ error: 'Error on email generation' });
        }
      }, Math.random() * 5000);
    });
  }

}
