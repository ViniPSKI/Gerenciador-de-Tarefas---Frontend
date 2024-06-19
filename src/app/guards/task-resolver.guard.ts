import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Task } from '../interfaces/TaskInterface';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskServiceService } from '../services/task/task-service.service';

@Injectable({
  providedIn: 'root'
})
export class taskResolverGuard implements Resolve<Task> {

  constructor(private taskService: TaskServiceService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Task | Observable<any> | Promise<any> {
    const id = route.paramMap.get('id');
    
    if(id != null){
      return this.taskService.getTaskById(id!); // ! para indicar que id não é null
    }

    return of({});
  }

}
