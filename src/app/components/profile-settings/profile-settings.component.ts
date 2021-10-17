import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';
  public user!: IProfile;
  public firstName: any = '';
  public lastName: any = '';
  public isLoading: boolean = false;
  public isSaving: boolean = false;
  public error = {
    hasErrorInEmail: false,
    hasErrorInSave: false,
    message: '',
  };
  constructor(public profileservice: ProfileService) {}

  ngOnInit(): void {
    this.isLoading = true;
    console.log(this.profileservice.dummy);
    this.profileservice
      .fetchWithAutoRetry(this.profileservice.getProfileUser)
      .then((data: any) => {
        this.user = data;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
      })
      .catch((err) => {
        console.log('ERROR', err);
      })
      .finally(() => (this.isLoading = false));
  }

  saveProfile(form: any) {
    this.resetErrorObject();
    this.isSaving = true;
    this.profileservice
      .setName(form.value.firstName, form.value.lastName)
      .then((e) => {
        this.setUserEmail();
        form.reset();
      })
      .catch((err: any) => {
        this.error.hasErrorInSave = true;
        this.error.message = err.error;
        this.isSaving = false;
      });
  }

  setUserEmail() {
    this.resetErrorObject();
    let email = `${this.user.firstName}.${this.user.lastName}@blueface.com`;
    this.profileservice
      .setUserEmail(email)
      .then((e: any) => {
        this.user = e;
      })
      .catch((err: any) => {
        this.error.hasErrorInEmail = true;
        this.error.message = err.error;
      })
      .finally(() => {
        this.isSaving = false;
      });
  }

  resetErrorObject() {
    this.error.hasErrorInEmail = false;
    this.error.hasErrorInSave = false;
    this.error.message = '';
  }
}
