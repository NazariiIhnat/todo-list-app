import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from './auth/auth.guard';
import { TaskComponent } from './task-list/task/task.component';
import { CategoryComponent } from './category/category.component';
import { HeadersComponent } from './headers/headers.component';
import { ModalComponent } from './modal/modal.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'task', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
  // {
  //   path: '',
  //   redirectTo: '/auth',
  //   pathMatch: 'full',
  // },

  { path: '', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
