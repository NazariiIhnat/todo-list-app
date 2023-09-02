import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { Subscription} from 'rxjs';
import { CategorySelectionService } from './category-selection.service';
import { SearchResultService } from '../headers/search-result.service';
import { CategoryDeleteModalService } from './category-delete-modal/category-delete-modal.service';

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
    private searchReaultService: SearchResultService,
    private categoryDeleteModalService: CategoryDeleteModalService
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

    this.userSearchInputSubscription = this.searchReaultService
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

  onSaveCategory(form: NgForm) {
    const name = form.controls['categoryName'].value;
    this.categoryService.save(new Category(name));
    this.isShownNewCategoryContainer = false;
  }

  onSelection(selectedCategory: { name: string; isSelected: boolean }) {
    if (!selectedCategory) return;
    this.selectedCategory = selectedCategory;
    this.categories.find((item) => item.isSelected === true).isSelected = false;
    selectedCategory.isSelected = true;
    this.categorySelectionService.setSelection(selectedCategory.name);
  }

  onCloseCategoryForm() {
    this.isShownNewCategoryContainer = false;
  }

  getTasksQuantityOfCategory(categoryName: string): number {
    return this.categoriesTasksQuantity.find(
      (obj) => obj.categoryName === categoryName
    )?.taskQuantity;
  }

  openCategoryDeleteModal(id: string) {
    this.categoryDeleteModalService.openModal(id);
  }
}
