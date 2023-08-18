import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { Subscription } from 'rxjs';
import { CategorySelectionService } from './category-selection.service';
import { SearchResultService } from '../headers/search-result.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  isShownNewCategoryContainer = false;
  categories = [];
  private userSearchInputSubscription = new Subscription();
  private categorySubscription = new Subscription();
  private selectedCategory: { name: string; isSelected: boolean };

  constructor(
    private categoryService: CategoryService,
    private categorySelectionService: CategorySelectionService,
    private searchReaultService: SearchResultService
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
}
