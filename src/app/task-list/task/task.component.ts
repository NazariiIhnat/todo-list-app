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

  onChangeImportance() {
    this.task.isImportant = !this.task.isImportant;
    this.taskService.update(this.id, this.task).subscribe();
  }

  onChangeStatus() {
    this.task.isDone = !this.task.isDone;
    this.taskService.update(this.id, this.task).subscribe();
  }
}
