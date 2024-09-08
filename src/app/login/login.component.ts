import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordMangerService } from './../password-manger.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SignUpComponent } from '../sign-up/sign-up.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isError: boolean = false;
  isOlduser: boolean = false;
  constructor(
    private PasswordMangerService: PasswordMangerService,
    private router: Router
  ) {}
  onSubmit(values: any) {
    this.PasswordMangerService.login(values.email, values.password)
      .then(() => {
        console.log(values);
        this.router.navigate(['/site-list'], {
          queryParams: { email: values.email },
        });
      })
      .catch((err) => {
        this.isError = true;
      });
  }
  onSignup(values: any) {
    console.log('Yes! signup', values);
    this.router.navigate(['/sign-up']);
  }
}
