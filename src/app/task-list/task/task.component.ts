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
  @Output() taskIdToBeRemovedEmitter = new EventEmitter();

  constructor(private taskService: TaskService) {}

  onDelete(id: string) {
    this.taskService
      .delete(id)
      .subscribe(() => this.taskIdToBeRemovedEmitter.next(id));
  }
}
