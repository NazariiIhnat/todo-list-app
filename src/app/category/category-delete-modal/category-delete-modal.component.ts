import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryDeleteModalService } from './category-delete-modal.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css'],
})
export class CategoryDeleteModalComponent implements OnInit, OnDestroy {
  modalVisabilitySubscription$ = new Subscription();
  isVisible: boolean = false;
  isConfirmedDeleteRelativeTasks: boolean;
  modalCanBeHidden: boolean;

  constructor(
    private categoryDeleteModalService: CategoryDeleteModalService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.modalVisabilitySubscription$ =
      this.categoryDeleteModalService.modalVisabilitySubject.subscribe(
        (isVisiable) => (this.isVisible = isVisiable)
      );
  }

  ngOnDestroy(): void {
    this.modalVisabilitySubscription$.unsubscribe();
  }

  closeCategoryDeleteModal() {
    this.categoryDeleteModalService.closeModal();
  }

  @HostListener('document:keydown.escape', ['$event'])
  closeModalByEscKey(event: KeyboardEvent): void {
    this.categoryDeleteModalService.closeModal();
  }

  @HostListener('document:mousedown', ['$event.target'])
  setModalCanBeHidden(element: HTMLElement): void {
    element.classList.contains('modal-container')
      ? (this.modalCanBeHidden = true)
      : (this.modalCanBeHidden = false);
  }

  @HostListener('document:mouseup', ['$event.target'])
  closeModalByClickOutsideOfModal(element: HTMLElement): void {
    if (element.classList.contains('modal-container'))
      if (this.modalCanBeHidden) this.isVisible = false;
  }

  deleteCategory() {
    this.categoryService.delete(
      this.categoryDeleteModalService.categoryIdToDelete,
      this.isConfirmedDeleteRelativeTasks
    );
    this.categoryDeleteModalService.closeModal();
  }
}
