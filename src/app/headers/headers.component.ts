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
import { RenderedTasksQuantityService } from '../task-list/rendered-tasks-quantity.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit, OnDestroy {
  categorySelectionSubscription = new Subscription();
  renderedTasksQuantitySubscription = new Subscription();
  selectedCategory: string;
  renderedTasksQuantity: number;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private categorySelectionService: CategorySelectionService,
    private renderedTasksQuantityService: RenderedTasksQuantityService
  ) {}

  ngOnInit(): void {
    this.categorySelectionSubscription =
      this.categorySelectionService.selectedCategorySubject.subscribe(
        (val) => (this.selectedCategory = val)
      );

    this.renderedTasksQuantitySubscription = this.renderedTasksQuantityService
      .getRenderedTasksQuantity()
      .subscribe((val) => (this.renderedTasksQuantity = val));
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
