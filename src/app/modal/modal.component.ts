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

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  categoryItems: { name: string }[] = [];
  @Output() closeModalEmitter = new EventEmitter<void>();

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.subscription = this.categoryService.fetch().subscribe((val) => {
      if (!val) return;
      Object.values(val).map((key) => {
        this.categoryItems.push({ name: key.name });
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('document:keydown.escape', ['$event'])
  closeModalByEscKey(event: KeyboardEvent): void {
    this.closeModalEmitter.next();
  }

  @HostListener('document:click', ['$event.target'])
  closeModalByClickOutsideForm(element: HTMLElement): void {
    if (element.classList.contains('modal-container'))
      this.closeModalEmitter.next();
  }

  onSubmit(form: NgForm) {
    const title = form.controls['title'].value;
    const description = form.controls['description'].value;
    const date = form.controls['date'].value;
    const category = form.controls['category'].value;
    const isImportant = form.controls['important'].value;
    const task = new Task(
      title,
      description,
      date,
      category,
      isImportant,
      false
    );
    this.taskService.save(task);
    this.closeModalEmitter.next();
  }
}
