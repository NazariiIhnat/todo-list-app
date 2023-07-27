import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl =
    'https://todo-list-app-58503-default-rtdb.europe-west1.firebasedatabase.app/task/';
  newTaskSubject = new Subject<[string, Task]>();

  constructor(private http: HttpClient) {}

  save(task: Task) {
    this.http
      .post<{ name: string }>(this.apiUrl, {
        title: task.title,
        description: task.description,
        date: task.date,
        category: task.category,
        isImportant: task.isImportant,
        isDone: task.isDone,
      })
      .subscribe((val) =>
        this.newTaskSubject.next([val.name.toString(), task])
      );
  }

  fetch() {
    return this.http.get<{ string: { task: Task } }>(this.apiUrl);
  }
}
