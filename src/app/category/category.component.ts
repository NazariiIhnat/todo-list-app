import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  isShownNewCategoryContainer = false;

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
}
