import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';
import { CategoryAddEditModalService } from './category-add-edit.modal.service';
import { CategorySelectionService } from '../category-selection.service';

@Component({
  selector: 'app-category-add-edit-modal',
  templateUrl: './category-add-edit-modal.component.html',
  styleUrls: ['./category-add-edit-modal.component.css'],
})
export class CategoryAddEditModalComponent implements OnDestroy, OnInit {
  modalVisabilitySubscription = new Subscription();
  updateCategorySubscription = new Subscription();
  isVisible: boolean = false;
  modalCanBeHidden: boolean;
  isEditMode: boolean;
  categoryNameToUpdate: string;
  catecoryToUpdate: Category;

  constructor(
    private categoryService: CategoryService,
    private categoryAddEditModalService: CategoryAddEditModalService,
    private categorySelectionService: CategorySelectionService
  ) {}

  ngOnInit(): void {
    this.modalVisabilitySubscription =
      this.categoryAddEditModalService.modalVisabilitySubject.subscribe(
        (val) => {
          this.isVisible = val;
        }
      );
    this.updateCategorySubscription =
      this.categoryAddEditModalService.updateCategorySubject.subscribe(
        (category) => {
          if (category) {
            this.isEditMode = true;
            this.catecoryToUpdate = category;
            this.categoryNameToUpdate = category.name;
          }
        }
      );
  }
  ngOnDestroy(): void {
    this.modalVisabilitySubscription.unsubscribe();
  }

  onSaveCategory(form: NgForm) {
    const name = form.controls['categoryName'].value;
    this.categoryService.save(new Category(name));
    this.onCloseModal();
  }

  onUpdateCategory(form: NgForm) {
    const newName = form.controls['categoryName'].value;
    this.categoryService.update(this.catecoryToUpdate['id'], newName);
    this.onCloseModal();
    this.categorySelectionService.setSelection(newName);
  }

  onCloseModal() {
    this.categoryAddEditModalService.closeModal();
    this.categoryNameToUpdate = '';
    this.isEditMode = false;
    this.catecoryToUpdate = null;
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
      if (this.modalCanBeHidden) {
        this.onCloseModal();
      }
  }

  @HostListener('document:keydown.escape', ['$event'])
  closeModalByEscKey(event: KeyboardEvent): void {
    this.onCloseModal();
  }
}
