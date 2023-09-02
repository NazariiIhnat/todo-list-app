import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskAddEditModalService } from 'src/app/task-list/task/task-add-edit-modal/task-add-edit-modal.service';
import { SearchResultService } from 'src/app/headers/search-result.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task;
  @Input() id: string;

  constructor(
    private taskService: TaskService,
    private modalService: TaskAddEditModalService,
    private searchResultService: SearchResultService
  ) {}

  onDelete() {
    this.taskService.delete(this.id);
    this.searchResultService.delete(this.id);
  }

  onChangeImportance() {
    this.task.isImportant = !this.task.isImportant;
    this.taskService.update(this.id, this.task);
  }

  onChangeStatus() {
    this.task.isDone = !this.task.isDone;
    this.taskService.update(this.id, this.task);
  }

  onEdit() {
    this.modalService.openModal();
    this.modalService.setEditeMode(true);
    this.modalService.setEditTask(this.id, this.task);
  }
}
