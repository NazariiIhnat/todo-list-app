import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { Subscription } from 'rxjs';
import { CategorySelectionService } from './category-selection.service';
import { SearchResultService } from '../headers/search-result.service';
import { CategoryDeleteModalService } from './category-delete-modal/category-delete-modal.service';
import { CategoryAddEditModalService } from './category-add-edit-modal/category-add-edit.modal.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  isShownNewCategoryContainer = false;
  categories = [];
  categoriesTasksQuantity = [];
  private userSearchInputSubscription = new Subscription();
  private categorySubscription = new Subscription();
  private tasksSubscription = new Subscription();
  private selectedCategory: { name: string; isSelected: boolean };

  constructor(
    private categoryService: CategoryService,
    private categorySelectionService: CategorySelectionService,
    private searchResultService: SearchResultService,
    private categoryDeleteModalService: CategoryDeleteModalService,
    private categoryAddEditModalService: CategoryAddEditModalService
  ) {}

  ngOnInit(): void {
    this.categoryService.fetch();
    this.categorySubscription =
      this.categoryService.categoriesSubject.subscribe(() => {
        this.categories = this.categoryService.categories;
        this.selectedCategory = this.categories.find(
          (category) => category.isSelected
        );
        if (!this.selectedCategory) {
          this.categories[0].isSelected = true;
          this.selectedCategory = this.categories[0];
        }
      });

    this.userSearchInputSubscription = this.searchResultService
      .getUserSearchInputSubject()
      .subscribe((input) => {
        if (input === '') this.onSelection(this.selectedCategory);
      });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.userSearchInputSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
  }

  onSelection(selectedCategory: { name: string; isSelected: boolean }) {
    if (!selectedCategory) return;
    this.selectedCategory = selectedCategory;
    this.categories.find((item) => item.isSelected === true).isSelected = false;
    selectedCategory.isSelected = true;
    this.categorySelectionService.setSelection(selectedCategory.name);
  }

  openCategoryDeleteModal(id: string) {
    this.categoryDeleteModalService.openModal(id);
  }

  onOpenCategoryAddEditModal(category: Category = null) {
    this.categoryAddEditModalService.openModal(category);
  }
}
