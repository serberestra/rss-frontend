import { NgModule, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPageComponent } from './Account/components/account-page/account-page.component';
import { EarnpointsOverviewPageComponent } from './Earnpoints/components/earnpoints-overview-page/earnpoints-overview-page.component';
import { QuizPageComponent } from './Quiz/components/quiz-page/quiz-page.component';
import { AccountSettingsPageComponent } from './Account/components/account-settings-page/account-settings-page.component';
import { IndividualQuizPageComponent } from './Quiz/components/individual-quiz-page/individual-quiz-page.component';
import { LandingPageComponent } from './LandingPage/components/landing-page/landing-page.component';
import { ShoppingCartComponent } from './Cart/shopping-cart/shopping-cart.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { AdminPageComponent } from './Admin/admin-page/admin-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'account/dashboard', component: AccountPageComponent },
  { path: 'earnpoints', component: EarnpointsOverviewPageComponent },
  { path: 'quizzes', component: QuizPageComponent },
  { path: 'quizzes/:id', component: IndividualQuizPageComponent },
  { path: 'account/settings', component: AccountSettingsPageComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  @Input() config;
  quizConfig;
}
