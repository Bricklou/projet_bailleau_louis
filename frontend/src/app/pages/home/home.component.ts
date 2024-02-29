import { Component } from '@angular/core';
import { MyFormComponent } from '../../components/my-form/my-form.component';
import { MyRecapComponent } from '../../components/my-recap/my-recap.component';
import { FormResult } from '../../types/form.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MyFormComponent, MyRecapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected result: FormResult | null = null;

  protected setResult(res: FormResult | null) {
    this.result = res;
  }
}
