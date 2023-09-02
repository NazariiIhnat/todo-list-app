import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../task.model';

@Injectable({ providedIn: 'root' })
export class TaskAddEditModalService {
  isOpenModalSubject$ = new Subject<boolean>();
  isEditModeSubject$ = new Subject<boolean>();
  editTaskSubject = new Subject<[id: string, task: Task]>();

  openModal() {
    this.isOpenModalSubject$.next(true);
  }

  closeModal() {
    this.isOpenModalSubject$.next(false);
  }

  setEditeMode(val: boolean) {
    this.isEditModeSubject$.next(val);
  }

  setEditTask(id: string, task: Task) {
    this.editTaskSubject.next([id, task]);
  }
}
