import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private isOpenModalSubject = new Subject<boolean>();
  isOpenModal$ = this.isOpenModalSubject.asObservable();

  openModal() {
    this.isOpenModalSubject.next(true);
  }

  closeModal() {
    this.isOpenModalSubject.next(false);
  }
}
