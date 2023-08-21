import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from './task/task.service';
import { CategorySelectionService } from '../category/category-selection.service';
import { RenderedTasksQuantityService } from './rendered-tasks-quantity.service';
import { SrotOptionService } from '../headers/sort-option.service';
import { SearchResultService } from '../headers/search-result.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  allUserTaks = [];
  renderedTasks = [];
  isRenderedSearchResult = false;
  selectedCategory: string = '';
  private subscription = new Subscription();
  private selectedCategorySubscription = new Subscription();
  private sortOptionSubscription = new Subscription();
  private searchResultSubscription = new Subscription();
  private authSubscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private categorySelectionService: CategorySelectionService,
    private renderedTasksQuantityService: RenderedTasksQuantityService,
    private sortOptionService: SrotOptionService,
    private searcResultService: SearchResultService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.taskService.fetch();
    this.subscription = this.taskService.tasksSubject.subscribe((tasks) => {
      this.allUserTaks = tasks;
      if (!this.isRenderedSearchResult) {
        this.renderedTasks = this.taskService.getFilteredTasksBy(
          this.selectedCategory
        );
        this.renderedTasksQuantityService.setRenderedTasksQuantity(
          this.renderedTasks.length
        );
      }
    });
    this.selectedCategorySubscription = this.categorySelectionService
      .getSelection()
      .subscribe((val) => {
        this.isRenderedSearchResult = false;
        this.selectedCategory = val;
        this.renderedTasks = this.taskService.getFilteredTasksBy(val);
        this.renderedTasksQuantityService.setRenderedTasksQuantity(
          this.renderedTasks.length
        );
      });
    this.sortOptionSubscription = this.sortOptionService
      .getSortOptionObservable()
      .subscribe((val) =>
        this.taskService.sortTasksBy(val, this.renderedTasks)
      );

    this.searchResultSubscription = this.searcResultService
      .getSearchResultSubject()
      .subscribe((val) => {
        if (val && val.length !== 0) {
          this.isRenderedSearchResult = true;
          this.renderedTasks = val;
        }
        this.renderedTasksQuantityService.setRenderedTasksQuantity(
          this.renderedTasks.length
        );
      });
    this.authSubscription = this.authService.user.subscribe((user) => {
      if (user) this.categorySelectionService.setSelection('All');
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.selectedCategorySubscription.unsubscribe();
    this.sortOptionSubscription.unsubscribe();
    this.searchResultSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
