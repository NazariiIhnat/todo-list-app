import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from './task/task.model';
import { Subscription } from 'rxjs';
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private sunscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.sunscription = this.taskService.newTaskSubject.subscribe((task) =>
      this.tasks.push(task)
    );
  }
  ngOnDestroy(): void {
    this.sunscription.unsubscribe();
  }
}
