import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from './task/task.service';
import { CategorySelectionService } from '../category/category-selection.service';
import { RenderedTasksQuantityService } from './rendered-tasks-quantity.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  allUserTaks = [];
  renderedTasks = [];
  selectedCategory: string = '';
  private subscription = new Subscription();
  private selectedCategorySubscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private categorySelectionService: CategorySelectionService,
    private renderedTasksQuantityService: RenderedTasksQuantityService
  ) {}

  ngOnInit(): void {
    this.taskService.fetch();
    this.subscription = this.taskService.tasksSubject.subscribe((tasks) => {
      this.allUserTaks = tasks;
      this.renderedTasks = this.getFilteredTasksBy(this.selectedCategory);
      this.renderedTasksQuantityService.setRenderedTasksQuantity(
        this.renderedTasks.length
      );
    });
    this.selectedCategorySubscription = this.categorySelectionService
      .getSelection()
      .subscribe((val) => {
        this.selectedCategory = val;
        this.renderedTasks = this.getFilteredTasksBy(val);
        this.renderedTasksQuantityService.setRenderedTasksQuantity(
          this.renderedTasks.length
        );
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.selectedCategorySubscription.unsubscribe();
  }

  deleteTask(id: string) {
    this.renderedTasks = this.renderedTasks.filter((el) => el[0] !== id);
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
}
