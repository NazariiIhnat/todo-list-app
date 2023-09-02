import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryDeleteModalService {
  modalVisabilitySubject = new Subject<boolean>();
  categoryIdToDelete: string = '';

  openModal(id: string) {
    this.modalVisabilitySubject.next(true);
    this.categoryIdToDelete = id;
  }

  closeModal() {
    this.modalVisabilitySubject.next(false);
    this.categoryIdToDelete = '';
  }
}
