import { Component } from '@angular/core';
import { MyFormComponent } from '../my-form/my-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MyFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
