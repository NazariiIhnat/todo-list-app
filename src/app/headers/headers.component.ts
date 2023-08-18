import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';
import { CategorySelectionService } from '../category/category-selection.service';
import { Subscription } from 'rxjs';
import { RenderedTasksQuantityService } from '../task-list/rendered-tasks-quantity.service';
import { SrotOptionService } from './sort-option.service';
import { TaskService } from '../task-list/task/task.service';
import { SearchResultService } from './search-result.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit, OnDestroy {
  categorySelectionSubscription = new Subscription();
  renderedTasksQuantitySubscription = new Subscription();
  sortOptionsNames = [
    'Alphabetically, A-Z',
    'Alphabetically, Z-A',
    'Completed first',
    'Uncompleted first',
    'Date, new first',
    'Date, old first',
  ];
  selectedCategory: string;
  renderedTasksQuantity: number;
  todayDate = new Date().toDateString();
  userSearchInput: string = '';
  userTasksSubscription = new Subscription();
  userTasks = [];
  searchResult = [];
  isVisibleSearchResults: boolean = false;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private categorySelectionService: CategorySelectionService,
    private renderedTasksQuantityService: RenderedTasksQuantityService,
    private sortOptionService: SrotOptionService,
    private taskService: TaskService,
    private searchResultService: SearchResultService
  ) {}

  ngOnInit(): void {
    this.categorySelectionSubscription =
      this.categorySelectionService.selectedCategorySubject.subscribe(
        (val) => (this.selectedCategory = val)
      );

    this.renderedTasksQuantitySubscription = this.renderedTasksQuantityService
      .getRenderedTasksQuantity()
      .subscribe((val) => (this.renderedTasksQuantity = val));
    this.userTasksSubscription = this.taskService.tasksSubject.subscribe(
      (tasks) => (this.userTasks = tasks)
    );
  }

  ngOnDestroy(): void {
    this.categorySelectionSubscription.unsubscribe();
    this.userTasksSubscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }

  onOpenModal(): void {
    this.modalService.setEditeMode(false);
    this.modalService.openModal();
  }

  onValueChange(event: any): void {
    this.sortOptionService.setSortOption(event.target.value);
  }

  searchTasks() {
    this.searchResultService.updateUserInput(this.userSearchInput);
    this.searchResult = this.userTasks.filter((task) =>
      task[1].title.includes(this.userSearchInput)
    );
    this.isVisibleSearchResults = this.userSearchInput.trim() !== '';
  }

  renderSelectedTask(taskId: string) {
    const task = this.searchResult.find((task) => task[0] === taskId);
    this.searchResultService.setSearchResult([task]);
    this.isVisibleSearchResults = false;
    this.selectedCategory = task[1].title;
    this.renderedTasksQuantity = 1;
  }

  renderAllSearchedTasks() {
    this.searchResultService.setSearchResult(this.searchResult);
    this.isVisibleSearchResults = false;
    this.selectedCategory = `All results for "${this.userSearchInput}"`;
    this.renderedTasksQuantity = this.searchResult.length;
  }
}
