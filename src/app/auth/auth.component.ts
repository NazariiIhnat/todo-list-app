import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  subscription: Subscription;

  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    this.authService.login(email, password).subscribe();
  }
  onSignup(form: NgForm) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    this.authService.signup(email, password).subscribe();
  }
}
