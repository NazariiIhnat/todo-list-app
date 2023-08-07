import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Task } from './task.model';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class TaskService implements OnDestroy {
  userTasks = [];
  tasksSubject = new Subject<any[]>();
  private apiUrl =
    'https://todo-list-app-58503-default-rtdb.europe-west1.firebasedatabase.app/task/';
  userSubscription = new Subscription();
  userId: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.init();
  }

  init(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userId = user?.id;
      if (user) this.userTasks = [];
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
      .subscribe((val) => {
        this.userTasks.push([val.name.toString(), task]);
        this.tasksSubject.next(this.userTasks);

        console.log(this.userTasks);
      });
  }

  fetch() {
    this.http
      .get<{ string: { task: Task } }>(this.apiUrl + this.userId + '.json')
      .subscribe((val) => {
        if (!val) return;
        this.userTasks = Object.entries(val);
        this.tasksSubject.next(this.userTasks);
      });
  }

  delete(taskId: string) {
    this.http
      .delete(this.apiUrl + this.userId + '/' + taskId + '.json')
      .subscribe(() => {
        this.userTasks = this.userTasks.filter((el) => el[0] !== taskId);
        this.tasksSubject.next(this.userTasks);
      });
  }

  update(taskId: string, task: Task) {
    this.http
      .put(this.apiUrl + this.userId + '/' + taskId + '.json', {
        title: task.title,
        description: task.description,
        date: task.date,
        category: task.category,
        isImportant: task.isImportant,
        isDone: task.isDone,
      })
      .subscribe(() => {
        this.userTasks.find((val) => val[0] === taskId)[1] = task;
        this.tasksSubject.next(this.userTasks);
      });
  }
}
