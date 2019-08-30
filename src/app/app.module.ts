import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeComponent } from './home/home.component';
import { HttpInterceptorService } from './shared-component/http-interceptor.service';
import { AlertService } from './shared-component/alert.service';
import { HttpService } from './shared-component/http.service';
import { SessionService } from './shared-component/session.service';
import { ApplicationRoutes } from './application-routing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    RouterModule.forRoot(ApplicationRoutes),
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule
  ],
  exports: [RouterModule, HttpClientModule, BrowserAnimationsModule],
  providers: [SessionService, HttpService, AlertService,
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
