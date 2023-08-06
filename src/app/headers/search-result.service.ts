import { Injectable } from '@angular/core';
import { Task } from '../task-list/task/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchResultService {
  searchResultSubject = new BehaviorSubject<Task[]>(null);

  setSearchResult(tasks: Task[]): void {
    this.searchResultSubject.next(tasks);
  }

  getSearchResultSubject(): Observable<Task[]> {
    return this.searchResultSubject.asObservable();
  }
}
