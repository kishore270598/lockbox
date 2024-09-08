import { PasswordMangerService } from './../password-manger.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PasswordListComponent } from '../password-list/password-list.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PasswordListComponent,
    RouterModule,
    NavbarComponent,
  ],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css',
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;
  siteName!: string;
  siteURl!: string;
  siteImgURL!: string;
  siteId!: string;
  formState: string = 'Add New';
  isSuccess: boolean = false;
  SuccessMessage!: string;
  emailId!: string;
  constructor(
    private PasswordMangerService: PasswordMangerService,
    private router: ActivatedRoute
  ) {
    this.router.queryParams.subscribe((param) => {
      this.emailId = param['email'];
      console.log(param);
    });
    this.loadSites();
  }

  //Once the submit is clicked it will call the service ,for that we pass the values.
  //when its correct it will tell data save
  //else error message

  dataAlert(message: string) {
    this.isSuccess = true;
    this.SuccessMessage = message;
  }
  onSubmit(values: object) {
    if (this.formState == 'Add New') {
      const valueswithemail = { ...values, email: this.emailId };
      console.log(valueswithemail);
      this.PasswordMangerService.addSite(valueswithemail)
        .then(() => {
          this.dataAlert('Data Saved Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.PasswordMangerService.updateSite(this.siteId, values)
        .then(() => {
          this.dataAlert('Data Updated Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  loadSites() {
    console.log();
    this.allSites = this.PasswordMangerService.loadSites(this.emailId);
  }
  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURl = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;
    this.formState = 'Edit';
  }
  deleteSite(id: string) {
    this.PasswordMangerService.deleteSite(id)
      .then(() => {
        this.dataAlert('Data Deleted Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
