import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {GettingStartedComponent} from "./getting-started/getting-started.component";
import {ActivateAccountComponent} from "./activate-account/activate-account.component";
import {PersonalDetailsComponent} from "./personal-details/personal-details.component";
import {BusinessDetailsComponent} from "./business-details/business-details.component";
import {BankDetailsComponent} from "./bank-details/bank-details.component";
import {ApiWebhookDetailsComponent} from "./api-webhook-details/api-webhook-details.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'getting-started', component: GettingStartedComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  { path: 'personal-details', component: PersonalDetailsComponent },
  { path: 'settings/personal-details', component: PersonalDetailsComponent },
  { path: 'business-details', component: BusinessDetailsComponent },
  { path: 'settings/business-details', component: BusinessDetailsComponent },
  { path: 'bank-details', component: BankDetailsComponent },
  { path: 'settings/bank-details', component: BankDetailsComponent },
  { path: 'api/keys/webhook', component: ApiWebhookDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path : '', component : LoginComponent }
];

export const routing = RouterModule.forRoot(routes);