import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TaskComponent } from './pages/task/task.component';
import { taskResolverGuard } from './guards/task-resolver.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { userResolver } from './guards/user.guard';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo: 'home'},
  {path:'home', component:HomeComponent},
  {path:'user/create', component:UserFormComponent},
  {path:'task/create', component:TaskFormComponent, resolve:{task: taskResolverGuard}},
  {path:'login', component:LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path:'task/:id', component: TaskComponent, resolve:{task: taskResolverGuard}},
  {path:'user', component:PerfilComponent, resolve:{user: userResolver}},
  {path:'task/edit/:id',component:TaskFormComponent, resolve:{task: taskResolverGuard}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
