import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css',
})
export class SiteListComponent {
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
