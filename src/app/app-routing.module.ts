import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  { path: 'task', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
