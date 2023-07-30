import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  renderedTasks = [];
  private sunscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.sunscription = this.taskService.tasksSubject.subscribe(
      (tasks) => (this.renderedTasks = tasks)
    );
    this.taskService.fetch();
  }
  ngOnDestroy(): void {
    this.sunscription.unsubscribe();
  }

  deleteTask(id: string) {
    this.renderedTasks = this.renderedTasks.filter((el) => el[0] !== id);
  }
}
