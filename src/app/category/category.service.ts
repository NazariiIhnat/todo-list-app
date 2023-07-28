import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from './category.model';
import { Subject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService implements OnDestroy {
  newCategory = new Subject<Category>();
  private userSubscription = new Subscription();
  private apiUrl =
    'https://todo-list-app-58503-default-rtdb.europe-west1.firebasedatabase.app/categories/';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.init();
  }

  init(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      console.log('123');

      this.apiUrl += user.id + '.json';
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

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
