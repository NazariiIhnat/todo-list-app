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
  private url: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.init();
  }

  init(): void {
    console.log(this.apiUrl);

    this.userSubscription = this.authService.user.subscribe((user) => {
      this.url = this.apiUrl + user?.id + '.json';
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  save(category: Category) {
    this.http
      .post(this.url, {
        name: category.name,
      })
      .subscribe();
    this.newCategory.next(category);
  }

  fetch() {
    return this.http.get(this.url);
  }
}
