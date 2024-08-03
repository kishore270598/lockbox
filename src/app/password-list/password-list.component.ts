import { PasswordMangerService } from './../password-manger.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
//Activated route act as a observer so we need a subscribe
export class PasswordListComponent {
  psiteId!: string;
  psiteName!: string;
  psiteURL!: string;
  psiteImgURl!: string;
  passwordList!: Observable<Array<any>>;
  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;
  formState: string = 'Add New';
  constructor(
    private route: ActivatedRoute,
    private PasswordMangerService: PasswordMangerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.psiteId = val.id;
      this.psiteName = val.siteName;
      this.psiteImgURl = val.siteImageUrl;
      this.psiteURL = val.siteUrl;
    });
    this.loadPassword();
  }
  restForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = 'Add new';
    this.passwordId = '';
  }

  onSubmit(value: object) {
    if (this.formState == 'Add New') {
      this.PasswordMangerService.addPassword(value, this.psiteId)
        .then(() => {
          console.log('Password saved successfully ');
          //to reset the page
          this.restForm();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.PasswordMangerService.updatePassword(
        this.psiteId,
        this.passwordId,
        value
      )
        .then(() => {
          console.log('Password updated successfully ');
          //to reset the page
          this.restForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  loadPassword() {
    this.passwordList = this.PasswordMangerService.loadPasswords(this.psiteId);
  }
  editPassword(
    email: string,
    username: string,
    password: string,
    passwordId: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;
    this.formState = 'Edit';
  }
}
