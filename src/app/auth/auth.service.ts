import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
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
    return this.http.post<AuthData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        this.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
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
        tap((res) => {
          this.user.next(new User(res.email, res.localId));
          this.isLoggedIn = true;
        })
      );
  }
}
