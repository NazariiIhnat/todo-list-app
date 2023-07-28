import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task;
  @Input() id: string;
  @Output() deleteTaskEmitter = new EventEmitter();

  constructor(private taskService: TaskService) {}

  onDelete() {
    this.taskService
      .delete(this.id)
      .subscribe(() => this.deleteTaskEmitter.next(this.id));
  }
}
