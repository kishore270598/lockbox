import { PasswordMangerService } from './../password-manger.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AES, enc } from 'crypto-js';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
//Activated route act as a observer so we need a subscribe
export class PasswordListComponent {
  psiteId!: string;
  psiteName!: string;
  psiteURL!: string;
  psiteImgURl!: string;
  passwordList!: Array<any>;
  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;
  formState: string = 'Add New';
  isSuccess: boolean = false;
  SuccessMessage!: string;

  dataAlert(message: string) {
    this.isSuccess = true;
    this.SuccessMessage = message;
  }

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
  onSubmit(value: any) {
    const encryptedPwd = this.encryptPassword(value.password);
    value.password = encryptedPwd;
    if (this.formState == 'Add New') {
      this.PasswordMangerService.addPassword(value, this.psiteId)
        .then(() => {
          this.dataAlert('Data saved successfully');
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
          this.dataAlert('Data Edited successfully');
          //to reset the page
          this.restForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  loadPassword() {
    this.PasswordMangerService.loadPasswords(this.psiteId).subscribe(
      (val: any) => {
        this.passwordList = val;
      }
    );
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
  deletePassword(passwordId: string) {
    this.PasswordMangerService.deletePassword(this.psiteId, passwordId)
      .then(() => {
        this.dataAlert('Data Deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  encryptPassword(password: string) {
    const secretKey =
      'HgHEYGgtokw6QhKJsk4MxXxjIOUI7IZmRCbJKFOvu27vtJ6u4AAEJgHv9H6pKapQ';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }
  decryptPassword(password: string) {
    const secretKey =
      'HgHEYGgtokw6QhKJsk4MxXxjIOUI7IZmRCbJKFOvu27vtJ6u4AAEJgHv9H6pKapQ';
    const decryptedPassword = AES.decrypt(password, secretKey).toString(
      enc.Utf8
    );
    return decryptedPassword;
  }

  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    this.passwordList[index].password = decPassword;
  }
}
