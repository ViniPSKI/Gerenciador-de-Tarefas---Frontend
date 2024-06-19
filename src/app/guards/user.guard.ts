import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../interfaces/UserInterface';
import { UserServiceService } from '../services/user/user-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userResolver implements Resolve<User> {

  constructor(private userService: UserServiceService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<any> | Promise<any> {
    return this.userService.getUser();
  }

}
