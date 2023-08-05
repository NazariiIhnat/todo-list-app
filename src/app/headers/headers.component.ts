import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';
import { CategorySelectionService } from '../category/category-selection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit, OnDestroy {
  categorySelectionSubscription = new Subscription();
  selectedCategory: string;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private categorySelectionService: CategorySelectionService
  ) {}

  ngOnInit(): void {
    this.categorySelectionSubscription =
      this.categorySelectionService.selectedCategorySubject.subscribe(
        (val) => (this.selectedCategory = val)
      );
  }

  ngOnDestroy(): void {
    this.categorySelectionSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onOpenModal() {
    this.modalService.setEditeMode(false);
    this.modalService.openModal();
  }
}
