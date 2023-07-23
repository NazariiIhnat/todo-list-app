import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from './category.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  newCategory = new Subject<Category>();
  private apiUrl =
    'https://todo-list-app-58503-default-rtdb.europe-west1.firebasedatabase.app/categories/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  save(category: Category) {
    this.http
      .post(this.apiUrl, {
        name: category.name,
      })
      .subscribe();
    this.newCategory.next(category);
  }

  fetch() {
    return this.http.get(this.apiUrl);
  }
}
