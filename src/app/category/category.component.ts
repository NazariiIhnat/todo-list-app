import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';
import { AuthService } from '../auth/auth.service';
import { Category } from './category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  isShownNewCategoryContainer = false;
  private subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.categoryService.fetch().subscribe((val) => {
      if (!val) return;
      Object.values(val).map((key) => {
        this.categoryItems.push({ name: key.name, isSelected: false });
      });
    });
    this.subscription = this.categoryService.newCategory.subscribe();
  }

  categoryItems = [
    {
      name: 'All',
      isSelected: true,
    },
    {
      name: 'Today',
      isSelected: false,
    },
    {
      name: 'Important',
      isSelected: false,
    },
  ];

  onSelection(menuItem) {
    this.categoryItems.find((item) => item.isSelected === true).isSelected =
      false;
    menuItem.isSelected = true;
  }

  onAddCategory(form: NgForm) {
    const newCategoryName = form.controls['categoryName'].value;
    if (form.valid)
      this.categoryItems.push({ name: newCategoryName, isSelected: false });
    this.isShownNewCategoryContainer = false;
  }

  onCloseCategoryForm() {
    this.isShownNewCategoryContainer = false;
  }

  onSaveCategory(form: NgForm) {
    const name = form.controls['categoryName'].value;
    const userID = this.authService.user.value.id;
    this.categoryService.save(new Category(name));
  }
}
