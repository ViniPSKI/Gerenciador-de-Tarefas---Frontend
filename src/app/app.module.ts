import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDefaultComponent } from './components/input-default/input-default.component';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MenuComponent } from './pages/menu/menu.component';
import { TaskComponent } from './pages/task/task.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AlertComponent } from './shared/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputDefaultComponent,
    HomeComponent,
    UserFormComponent,
    TaskFormComponent,
    MenuComponent,
    TaskComponent,
    PerfilComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
