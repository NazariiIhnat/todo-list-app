import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Task } from './task.model';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class TaskService implements OnDestroy {
  private apiUrl =
    'https://todo-list-app-58503-default-rtdb.europe-west1.firebasedatabase.app/task/';
  newTaskSubject = new Subject<[string, Task]>();
  userSubscription = new Subscription();
  userId: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.init();
  }

  init(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userId = user?.id;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  save(task: Task) {
    this.http
      .post<{ name: string }>(this.apiUrl + this.userId + '.json', {
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
    return this.http.get<{ string: { task: Task } }>(
      this.apiUrl + this.userId + '.json'
    );
  }

  delete(taskID: string) {
    return this.http.delete(this.apiUrl + this.userId + '/' + taskID + '.json');
  }
}
