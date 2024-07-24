import { PasswordMangerService } from './../password-manger.service';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css',
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;
  constructor(private PasswordMangerService: PasswordMangerService) {
    this.loadSites();
  }

  //Once the submit is clicked it will call the service ,for that we pass the values.
  //when its correct it will tell data save
  //else error message

  onSubmit(values: object) {
    console.log(values);
    this.PasswordMangerService.addSite(values)
      .then(() => {
        console.log('Data save success');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  loadSites() {
    this.allSites = this.PasswordMangerService.loadSites();
  }
}
