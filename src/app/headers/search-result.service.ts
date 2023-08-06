import { Injectable } from '@angular/core';
import { Task } from '../task-list/task/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchResultService {
  renderedTasks: Task[] = [];
  searchResultSubject = new BehaviorSubject<Task[]>(null);

  setSearchResult(tasks: Task[]): void {
    this.renderedTasks = tasks;
    this.searchResultSubject.next(this.renderedTasks);
  }

  getSearchResultSubject(): Observable<Task[]> {
    return this.searchResultSubject.asObservable();
  }

  delete(id: string) {
    const index = this.renderedTasks.findIndex((task) => task[0] === id);
    this.renderedTasks.splice(index, 1);
    this.setSearchResult(this.renderedTasks);
  }
}
