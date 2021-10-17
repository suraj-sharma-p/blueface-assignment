import { Injectable } from '@angular/core';
import { IProfile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public user!: IProfile;
  public dummy = 'suraj';
  constructor() {}

  getProfileUser(context: any): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          context.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            age: 30,
          };
          resolve(context.user);
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 5000);
    });
  }

  fetchWithAutoRetry(fn: any) {
    return new Promise((resolve, reject) => {
      const newFun = () =>
        fn(this).then(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            newFun();
          }
        );
      newFun();
    });
  }

  setName(firstName: string, lastName: string) {
    console.log(firstName, lastName);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          this.user.lastName = lastName;
          this.user.username = firstName + '.' + lastName;
          resolve(this.user);
        } else {
          reject({ error:'Invalid name'});
        }
      }, Math.random() * 5000);
    });
  }

  setUserEmail(email: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.email = email;
          resolve(this.user);
        } else {
          reject({ error: 'Error on email generation' });
        }
      }, Math.random() * 5000);
    });
  }
}
