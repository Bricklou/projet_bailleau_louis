import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { AuthService } from './services/auth.service';
import { catchError, delay, mergeMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
