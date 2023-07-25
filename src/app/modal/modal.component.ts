import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CategoryService } from '../category/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  categoryItems: { name: string }[] = [];
  @Output() closeModalEmitter = new EventEmitter<void>();

  constructor(private categoryService: CategoryService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('document:keydown.escape', ['$event'])
  closeModalByEscKey(event: KeyboardEvent): void {
    this.closeModalEmitter.next();
  }

  @HostListener('document:click', ['$event.target'])
  closeModalByClickOutsideForm(element: HTMLElement): void {
    if (element.classList.contains('modal-container'))
      this.closeModalEmitter.next();
  }
  ngOnInit(): void {
    this.subscription = this.categoryService.fetch().subscribe((val) => {
      if (!val) return;
      Object.values(val).map((key) => {
        this.categoryItems.push({ name: key.name });
      });
    });
  }
}
