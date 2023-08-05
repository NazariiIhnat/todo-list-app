import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SrotOptionService {
  sortOptionSubject = new BehaviorSubject<string>('');

  setSortOption(name: string): void {
    this.sortOptionSubject.next(name);
  }

  getSortOptionObservable(): Observable<string> {
    return this.sortOptionSubject.asObservable();
  }
}
