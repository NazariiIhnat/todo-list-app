import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../category.model';

@Injectable({ providedIn: 'root' })
export class CategoryAddEditModalService {
  modalVisabilitySubject = new Subject<boolean>();
  updateCategorySubject = new Subject<Category>();

  openModal(category: Category = null) {
    this.modalVisabilitySubject.next(true);
    if (category) this.updateCategorySubject.next(category);
  }

  closeModal() {
    this.modalVisabilitySubject.next(false);
    this.updateCategorySubject.next(null);
  }
}
