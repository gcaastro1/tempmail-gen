import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'
import { GraphQLModule } from './graphql/graphql.module'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { TextInputComponent } from './components/text-input/text-input.component'
import { MailListComponent } from './components/mail-list/mail-list.component'
import { MailBoxComponent } from './components/mail-box/mail-box.component'
import { MailCardComponent } from './components/mail-card/mail-card.component'
import {
  FormatTimePipe,
  RefreshButtonComponent,
} from './components/refresh-button/refresh-button.component'
import { NotificationButtonComponent } from './components/notification-button/notification-button.component'

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    MailListComponent,
    MailBoxComponent,
    MailCardComponent,
    RefreshButtonComponent,
    FormatTimePipe,
    NotificationButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
