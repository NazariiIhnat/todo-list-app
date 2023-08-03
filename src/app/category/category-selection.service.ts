import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategorySelectionService {
  selectedCategorySubject = new BehaviorSubject<string>('All');

  setSelection(category: string): void {
    this.selectedCategorySubject.next(category);
  }

  getSelection(): Observable<string> {
    return this.selectedCategorySubject.asObservable();
  }
}
