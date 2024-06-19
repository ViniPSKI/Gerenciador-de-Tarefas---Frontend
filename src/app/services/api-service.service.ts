import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../interfaces/UserInterface';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl = 'http://localhost:8080/auth/login';

  private jwt : string | any = "";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  auth(user: User):Observable<{ token: string }>{

    this.jwt = this.http.post<{ token: string }>(this.baseUrl, user).pipe(take(1));
    this.cookieService.set('userEmail', user.email);
    return this.jwt;
    
  }

  setToken(token: string) {
    this.cookieService.set('authToken', token);
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }


}
