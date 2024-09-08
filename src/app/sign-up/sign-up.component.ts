import { Component, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { NgIf } from '@angular/common';
import { PasswordMangerService } from '../password-manger.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  isTrue: boolean = false;
  isExisting: boolean = false;
  constructor(
    private PasswordMangerService: PasswordMangerService,
    private router: Router
  ) {}
  Signup(values: any) {
    console.log('yes1');
    this.isExisting = false;
    this.isTrue = false;
    this.PasswordMangerService.signup(values.email, values.password)
      .then(() => {
        console.log(values);
        this.isTrue = true;
      })
      .catch((err: any) => {
        this.isExisting = true;
      });
  }
  routeback() {
    console.log('yes');
    this.router.navigate(['/']);
  }
}
