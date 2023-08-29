import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiKey = 'AIzaSyCVR0Mmc344Kn728ll183aV7UjsZmxLwJI';
  user = new BehaviorSubject<User>(null);
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('login_user')) this.autoLogin();
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleSignupErrors));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleLoginErrors),
        tap((res) => {
          const user = new User(
            res.email,
            res.localId,
            res.idToken,
            new Date().getTime() + 3600 * 1000
          );
          this.user.next(user);
          localStorage.setItem('login_user', JSON.stringify(user));
          this.isLoggedIn = true;
          this.autoLogout(user.expiresIn - new Date().getTime());
        })
      );
  }

  private handleLoginErrors(error: HttpErrorResponse) {
    let errorMessage = '';
    switch (error.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User disabled';
        break;
      default:
        errorMessage = 'Unknown error';
    }

    return throwError(() => {
      return new Error(errorMessage);
    });
  }

  private handleSignupErrors(error: HttpErrorResponse) {
    let errorMessage = '';
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email exists';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Operations not allowed';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts. Try later.';
        break;
      default:
        errorMessage = 'Unknown error';
    }

    return throwError(() => {
      return new Error(errorMessage);
    });
  }

  logout() {
    this.user.next(null);
    this.isLoggedIn = false;
    localStorage.removeItem('login_user');
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const data = JSON.parse(localStorage.getItem('login_user'));
    const user = new User(
      data.email,
      data.localId,
      data.idToken,
      data.expiresIn
    );
    this.user.next(user);
    this.router.navigate(['/task']);
    this.isLoggedIn = true;
    this.autoLogout(user.expiresIn - new Date().getTime());
  }

  autoLogout(milsLeft: number) {
    setTimeout(() => {
      this.logout();
    }, milsLeft);
  }
}
