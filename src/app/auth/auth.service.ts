import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

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
  user = new Subject<User>();
  isLoggedIn = false;

  constructor(private http: HttpClient) {}

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
          this.user.next(new User(res.email, res.localId));
          this.isLoggedIn = true;
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
}
