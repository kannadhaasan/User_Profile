import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../types/iprofile';
import { FormBuilder, FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';
  public user: IProfile = new IProfile() ;
  public isProfileLoaded: boolean = false;
  public isProfileSaving: boolean = false;
  public errorMessage: any;
  public originalUser: IProfile;
  public isSavingerror: boolean = false;
  @ViewChild('form') form;
  formGroup = this.formBuilder.group({
    firstName: [this.user.firstName],
    lastName: [this.user.lastName, []],
    email: ['', [Validators.email]]
  })


  constructor(private profile: ProfileService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.getUserProfile();    
  }

  async retryService(fn: () => Promise<any>, retryCount: number): Promise<IProfile> {    
    for (let i = 0; i < retryCount; i++) {
      retryCount = retryCount + 1;
      if ((!this.user) || this.user.firstName === this.user.firstName) {
        try {
          return await fn();
        } catch (error) {
          console.log("Promise did not return result");

        }
      }
    }
  }

  async saveUsername(): Promise<IProfile> {
    let lastError: any;
    this.isProfileSaving = true;
    
        try {
          this.isProfileSaving = true;
          this.isSavingerror = false;
          const user:any = await this.profile.setName(this.formGroup.controls['firstName'].value, this.formGroup.controls['lastName'].value, this.user);
          const userWithUpdatedEmail:any = await this.profile.setEmail(user);
          this.user.firstName = user.firstName;
          this.user.lastName = user.lastName;
          this.user.email = userWithUpdatedEmail.email;
          this.formGroup.controls['email'].setValue(this.user.email);
          this.originalUser = this.user;
          this.isProfileSaving=false;
          
        } catch (error) {
          this.formGroup.controls['firstName'].setValue(this.originalUser.firstName);
          this.formGroup.controls['lastName'].setValue(this.originalUser.lastName);
          this.isProfileSaving = false;
          this.isSavingerror = true;
          console.log("Promise did not return result");
          this.errorMessage = error.error;
        }
    throw lastError;
  }
  
  async getUserProfile() {
    const user = () => this.retryService(() => this.profile.getProfileUser(), 1);
    this.user = await user();
    this.originalUser = await user();
    this.formGroup.controls['firstName'].setValue(this.user.firstName);
    this.formGroup.controls['lastName'].setValue(this.user.lastName);
    this.formGroup.controls['email'].setValue(this.user.email);
    this.isProfileLoaded = true;
  }

  async saveUserProfile(){
    this.saveUsername();
  }


}
