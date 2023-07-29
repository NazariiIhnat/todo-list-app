import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CategoryService } from '../category/category.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task-list/task/task.service';
import { Task } from '../task-list/task/task.model';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  categorySubscription = new Subscription();
  modalSubscription = new Subscription();
  editModeSubscription = new Subscription();
  editTaskSubscription = new Subscription();
  categoryItems: { name: string }[] = [];
  isOpenModal: boolean;
  isEditMode: boolean;
  editTaskId: string;
  editTask: Task;

  constructor(
    private categoryService: CategoryService,
    private modalService: ModalService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.categorySubscription = this.categoryService
      .fetch()
      .subscribe((val) => {
        if (!val) return;
        Object.values(val).map((key) => {
          this.categoryItems.push({ name: key.name });
        });
      });

    this.modalSubscription = this.modalService.isOpenModalSubject$.subscribe(
      (isOpen) => (this.isOpenModal = isOpen)
    );

    this.editModeSubscription = this.modalService.isEditModeSubject$.subscribe(
      (isEditMode) => (this.isEditMode = isEditMode)
    );
    this.editTaskSubscription = this.modalService.editTaskSubject.subscribe(
      (val) => {
        this.editTaskId = val[0];
        this.editTask = val[1];
      }
    );
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.modalSubscription.unsubscribe();
    this.editModeSubscription.unsubscribe();
    this.editTaskSubscription.unsubscribe();
  }

  @HostListener('document:keydown.escape', ['$event'])
  closeModalByEscKey(event: KeyboardEvent): void {
    this.modalService.closeModal();
  }

  @HostListener('document:click', ['$event.target'])
  closeModalByClickOutsideForm(element: HTMLElement): void {
    if (element.classList.contains('modal-container'))
      this.modalService.closeModal();
  }

  onSubmit(form: NgForm) {
    if (this.isEditMode) {
    } else {
      const title = form.controls['title'].value;
      const description = form.controls['description'].value;
      const date = form.controls['date'].value;
      const category = form.controls['category'].value;
      const isImportant = form.controls['important'].value ? true : false;
      const task = new Task(
        title,
        description,
        date,
        category,
        isImportant,
        false
      );
      this.taskService.save(task);
      this.modalService.closeModal();
    }
  }
}
