import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  isOpenModal = false;

  handleOpenModal(eventData: any) {
    this.isOpenModal = true;
  }

  handleCloseModal(eventData: any) {
    this.isOpenModal = false;
  }
}
