import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from "./core/api.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { routing } from "./app.routing";
import { TokenInterceptor } from "./core/interceptor";
import { SignupComponent } from './signup/signup.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { NavigationFooterComponent } from './navigation-footer/navigation-footer.component';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { ApiWebhookDetailsComponent } from './api-webhook-details/api-webhook-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    GettingStartedComponent,
    ActivateAccountComponent,
    PersonalDetailsComponent,
    DashboardComponent,
    NavigationMenuComponent,
    NavigationHeaderComponent,
    NavigationFooterComponent,
    BusinessDetailsComponent,
    BankDetailsComponent,
	ApiWebhookDetailsComponent
  ],
  imports: [
    BrowserModule,
	routing,
	FormsModule,
    ReactiveFormsModule,
	HttpClientModule,
	BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
		enableHtml :  true,
		timeOut : 5000,
		preventDuplicates : true,
		closeButton : true
	}) // ToastrModule added
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
	multi : true},{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
