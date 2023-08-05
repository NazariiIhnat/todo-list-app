import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RenderedTasksQuantityService {
  renderedTasksQuantitySubject = new BehaviorSubject<number>(0);

  setRenderedTasksQuantity(quantity: number): void {
    this.renderedTasksQuantitySubject.next(quantity);
  }

  getRenderedTasksQuantity(): Observable<number> {
    return this.renderedTasksQuantitySubject.asObservable();
  }
}
