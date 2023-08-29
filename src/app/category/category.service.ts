import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from './category.model';
import { Subject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService implements OnDestroy {
  private defaultCategoriesNames = [
    'All',
    'Today',
    'Important',
    'Unimportant',
    'Completed',
    'Uncompleted',
  ];
  categories = [];
  categoriesSubject = new Subject<any[]>();
  private userSubscription = new Subscription();
  private apiUrl =
    'https://todo-list-app-58503-default-rtdb.europe-west1.firebasedatabase.app/categories/';
  private userID: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.init();
  }

  init(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userID = user?.localId;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  save(category: Category) {
    this.http
      .post(this.apiUrl + this.userID + '.json', {
        name: category.name,
      })
      .subscribe((id) => {
        this.categories.push({
          id,
          name: category.name,
          isSelected: false,
        });
      });
    this.categoriesSubject.next(this.categories);
  }

  fetch() {
    this.categories = [...this.getDefaultCategories()];
    this.http.get(this.apiUrl + this.userID + '.json').subscribe((val) => {
      if (val) {
        const categories = [
          ...Object.entries(val).map((key) => {
            return {
              id: key[0],
              name: key[1].name,
              isSelected: false,
            };
          }),
        ];
        categories.forEach((category) => this.categories.push(category));
      }
      this.categoriesSubject.next(this.categories);
    });
  }

  private getDefaultCategories() {
    return this.defaultCategoriesNames.map((name) => {
      return { name: name, isSelected: false };
    });
  }
}
