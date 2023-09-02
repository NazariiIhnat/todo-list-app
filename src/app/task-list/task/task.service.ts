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
      this.userId = user?.localId;
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

  removeCategoryFromTasks(categoryName: string) {
    const tasksToUpdate = this.userTasks.filter(
      (task) => task[1].category === categoryName
    );
    tasksToUpdate.forEach((task) => {
      this.update(
        task[0],
        new Task(
          task[1].title,
          task[1].description,
          task[1].date,
          null,
          task[1].isImportant,
          task[1].isDone
        )
      );
    });
  }

  deleteTasksOfCategory(categoryName: string) {
    const tasksToDelete = this.userTasks.filter(
      (task) => task[1].category === categoryName
    );
    tasksToDelete.forEach((task) => this.delete(task[0]));
  }

  getFilteredTasksBy(name: string) {
    switch (name) {
      case 'All':
        return this.userTasks;
      case 'Today':
        return this.userTasks.filter(
          (task) =>
            new Date(task[1].date).toDateString() === new Date().toDateString()
        );
      case 'Important':
        return this.userTasks.filter((task) => task[1].isImportant);
      case 'Unimportant':
        return this.userTasks.filter((task) => !task[1].isImportant);
      case 'Completed':
        return this.userTasks.filter((task) => task[1].isDone);
      case 'Uncompleted':
        return this.userTasks.filter((task) => !task[1].isDone);
      default:
        return this.userTasks.filter((task) => task[1].category === name);
    }
  }

  sortTasksBy(name: string, tasks: Task[]) {
    switch (name) {
      case 'Alphabetically, A-Z':
        this.sortTasksByTitleASC(tasks);
        break;
      case 'Alphabetically, Z-A':
        this.sortTasksByTitleDESC(tasks);
        break;
      case 'Completed first':
        this.sortTasksByCompleteFirst(tasks);
        break;
      case 'Uncompleted first':
        this.sortTasksByUncompletedFirst(tasks);
        break;
      case 'Date, old first':
        this.sortTasksByDateOldFirst(tasks);
        break;
      case 'Date, new first':
        this.sortTasksByDateNewFirst(tasks);
        break;
    }
  }

  private sortTasksByTitleASC(tasks: Task[]) {
    tasks.sort((a, b) => a[1].title.localeCompare(b[1].title));
  }

  private sortTasksByTitleDESC(tasks: Task[]) {
    tasks.sort((a, b) => b[1].title.localeCompare(a[1].title));
  }

  private sortTasksByCompleteFirst(tasks: Task[]) {
    tasks.sort((a, b) => b[1].isDone - a[1].isDone);
  }

  private sortTasksByUncompletedFirst(tasks: Task[]) {
    tasks.sort((a, b) => a[1].isDone - b[1].isDone);
  }

  private sortTasksByDateOldFirst(tasks: Task[]) {
    tasks.sort(
      (a, b) => new Date(a[1].date).getTime() - new Date(b[1].date).getTime()
    );
  }

  private sortTasksByDateNewFirst(tasks: Task[]) {
    tasks.sort(
      (a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime()
    );
  }
}
