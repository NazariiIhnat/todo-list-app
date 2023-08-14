import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { Subscription } from 'rxjs';
import { CategorySelectionService } from './category-selection.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  isShownNewCategoryContainer = false;
  categories = [];
  private categorySubscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private categorySelectionService: CategorySelectionService
  ) {}

  ngOnInit(): void {
    this.categoryService.fetch();
    this.categorySubscription =
      this.categoryService.categoriesSubject.subscribe(() => {
        this.categories = this.categoryService.categories;
        const selectedCategory = this.categories.find(
          (category) => category.isSelected
        );
        if (!selectedCategory) this.categories[0].isSelected = true;
      });
  }
  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

  onSaveCategory(form: NgForm) {
    const name = form.controls['categoryName'].value;
    this.categoryService.save(new Category(name));
    this.isShownNewCategoryContainer = false;
  }

  onSelection(menuItem) {
    this.categories.find((item) => item.isSelected === true).isSelected = false;
    menuItem.isSelected = true;
    this.categorySelectionService.setSelection(menuItem.name);
  }

  onCloseCategoryForm() {
    this.isShownNewCategoryContainer = false;
  }
}
