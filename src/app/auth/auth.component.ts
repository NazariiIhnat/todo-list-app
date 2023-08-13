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

  message: string;
  isErrorMessage: boolean = false;

  onLogin(form: NgForm) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    this.authService.login(email, password).subscribe(
      (res) => {
        this.message = null;
        this, this.router.navigate(['task']);
        this.isErrorMessage = false;
      },
      (error) => {
        this.message = error.message;
        this.isErrorMessage = true;
      }
    );
    form.reset();
  }
  onSignup(form: NgForm) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    this.authService.signup(email, password).subscribe(
      (res) => {
        this.message = `User ${res.email} created`;
        this.isErrorMessage = false;
      },
      (error) => {
        this.message = error.message;
        this.isErrorMessage = true;
      }
    );
    form.reset();
  }
}
