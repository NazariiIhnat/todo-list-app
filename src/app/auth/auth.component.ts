import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}

  errorMessage: string;

  onLogin(form: NgForm) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    this.authService.login(email, password).subscribe(
      (res) => {
        this.errorMessage = null;
        this, this.router.navigate(['task']);
      },
      (error) => (this.errorMessage = error.message)
    );
    form.reset();
  }
  onSignup(form: NgForm) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    this.authService.signup(email, password).subscribe(
      (res) => {
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
    form.reset();
  }
}
