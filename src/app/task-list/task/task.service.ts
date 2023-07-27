import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl =
    'https://todo-list-app-58503-default-rtdb.europe-west1.firebasedatabase.app/task/';
  newTaskSubject = new Subject<Task>();

  constructor(private http: HttpClient) {}

  save(task: Task) {
    this.http
      .post<Task>(this.apiUrl, {
        title: task.title,
        description: task.description,
        date: task.date,
        category: task.category,
        isImportant: task.isImportant,
        isDone: task.isDone,
      })
      .subscribe((x) => {
        this.newTaskSubject.next(task);
      });
  }

  fetch() {
    return this.http.get<{ string: { task: Task } }>(this.apiUrl);
  }
}
