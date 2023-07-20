import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from './auth/auth.guard';
import { TaskComponent } from './task-list/task/task.component';

const routes: Routes = [
  { path: '', component: TaskComponent },
  { path: 'all', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
  // {
  //   path: '',
  //   redirectTo: '/auth',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
