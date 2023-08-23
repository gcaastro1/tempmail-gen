import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'
import { GraphQLModule } from './graphql/graphql.module'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { TextInputComponent } from './components/text-input/text-input.component'
import { AsideComponent } from './components/aside/aside.component'
import { MailBoxComponent } from './components/mail-box/mail-box.component'
import { MailCardComponent } from './components/mail-card/mail-card.component'

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    AsideComponent,
    MailBoxComponent,
    MailCardComponent,
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
