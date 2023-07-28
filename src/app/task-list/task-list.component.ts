import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks = [];
  private sunscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.sunscription = this.taskService.newTaskSubject.subscribe((task) =>
      this.tasks.push(task)
    );
    this.taskService.fetch().subscribe((tasks) => {
      if (!tasks) return;
      this.tasks = Object.entries(tasks);
    });
  }
  ngOnDestroy(): void {
    this.sunscription.unsubscribe();
  }

  handleRemoveTask(id: string) {
    this.tasks = this.tasks.filter((el) => el[0] !== id);
  }
}
