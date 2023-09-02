import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task-list/task/task.component';
import { CategoryComponent } from './category/category.component';
import { HeadersComponent } from './headers/headers.component';
import { TaskAddEditModalComponent } from './task-list/task/task-add-edit-modal/task-add-edit-modal.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { CategoryDeleteModalComponent } from './category/category-delete-modal/category-delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TaskListComponent,
    TaskComponent,
    CategoryComponent,
    HeadersComponent,
    TaskAddEditModalComponent,
    TodoListComponent,
    CategoryDeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
