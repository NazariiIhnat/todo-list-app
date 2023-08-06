import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from './task/task.service';
import { CategorySelectionService } from '../category/category-selection.service';
import { RenderedTasksQuantityService } from './rendered-tasks-quantity.service';
import { SrotOptionService } from '../headers/sort-option.service';
import { SearchResultService } from '../headers/search-result.service';

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

  constructor(
    private taskService: TaskService,
    private categorySelectionService: CategorySelectionService,
    private renderedTasksQuantityService: RenderedTasksQuantityService,
    private sortOptionService: SrotOptionService,
    private searcResultService: SearchResultService
  ) {}

  ngOnInit(): void {
    this.taskService.fetch();
    this.subscription = this.taskService.tasksSubject.subscribe((tasks) => {
      this.allUserTaks = tasks;
      if (!this.isRenderedSearchResult) {
        this.renderedTasks = this.getFilteredTasksBy(this.selectedCategory);
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
        this.renderedTasks = this.getFilteredTasksBy(val);
        this.renderedTasksQuantityService.setRenderedTasksQuantity(
          this.renderedTasks.length
        );
      });
    this.sortOptionSubscription = this.sortOptionService
      .getSortOptionObservable()
      .subscribe((val) => this.sortTasksBy(val));

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
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.selectedCategorySubscription.unsubscribe();
    this.sortOptionSubscription.unsubscribe();
    this.searchResultSubscription.unsubscribe();
  }

  private getFilteredTasksBy(name: string) {
    switch (name) {
      case 'All':
        return this.allUserTaks;
      case 'Today':
        return this.allUserTaks.filter(
          (task) =>
            new Date(task[1].date).toDateString() === new Date().toDateString()
        );
      case 'Important':
        return this.allUserTaks.filter((task) => task[1].isImportant);
      case 'Unimportant':
        return this.allUserTaks.filter((task) => !task[1].isImportant);
      case 'Completed':
        return this.allUserTaks.filter((task) => task[1].isDone);
      case 'Uncompleted':
        return this.allUserTaks.filter((task) => !task[1].isDone);
      default:
        return this.allUserTaks.filter((task) => task[1].category === name);
    }
  }

  private sortTasksBy(name: string) {
    switch (name) {
      case 'Alphabetically, A-Z':
        this.sortTasksByTitleASC();
        break;
      case 'Alphabetically, Z-A':
        this.sortTasksByTitleDESC();
        break;
      case 'Completed first':
        this.sortTasksByCompleteFirst();
        break;
      case 'Uncompleted first':
        this.sortTasksByUncompletedFirst();
        break;
      case 'Date, old first':
        this.sortTasksByDateOldFirst();
        break;
      case 'Date, new first':
        this.sortTasksByDateNewFirst();
        break;
    }
  }

  private sortTasksByTitleASC() {
    this.renderedTasks.sort((a, b) => a[1].title.localeCompare(b[1].title));
  }

  private sortTasksByTitleDESC() {
    this.renderedTasks.sort((a, b) => b[1].title.localeCompare(a[1].title));
  }

  private sortTasksByCompleteFirst() {
    this.renderedTasks.sort((a, b) => b[1].isDone - a[1].isDone);
  }

  private sortTasksByUncompletedFirst() {
    this.renderedTasks.sort((a, b) => a[1].isDone - b[1].isDone);
  }

  private sortTasksByDateOldFirst() {
    this.renderedTasks.sort(
      (a, b) => new Date(a[1].date).getTime() - new Date(b[1].date).getTime()
    );
  }

  private sortTasksByDateNewFirst() {
    this.renderedTasks.sort(
      (a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime()
    );
  }
}
