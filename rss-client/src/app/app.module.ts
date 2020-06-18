import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FilterPipe } from './filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountPageComponent } from './Account/components/account-page/account-page.component';
import { QuizPageComponent } from './Quiz/components/quiz-page/quiz-page.component';
import { HeaderComponent } from './Common/header/header.component';
import { EarnpointsOverviewPageComponent } from './Earnpoints/components/earnpoints-overview-page/earnpoints-overview-page.component';
import { AccountSettingsPageComponent } from './Account/components/account-settings-page/account-settings-page.component';
import { LandingPageComponent } from './LandingPage/components/landing-page/landing-page.component';
import { IndividualQuizPageComponent } from './Quiz/components/individual-quiz-page/individual-quiz-page.component';
import { PreTestComponent } from './Quiz/components/pre-test/pre-test.component';
import { TestInProgressComponent } from './Quiz/components/test-in-progress/test-in-progress.component';
import { PostTestComponent } from './Quiz/components/post-test/post-test.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountPageComponent,
    QuizPageComponent,
    HeaderComponent,
    EarnpointsOverviewPageComponent,
    AccountSettingsPageComponent,
    LandingPageComponent,
    IndividualQuizPageComponent,
    FilterPipe,
    PreTestComponent,
    TestInProgressComponent,
    PostTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
