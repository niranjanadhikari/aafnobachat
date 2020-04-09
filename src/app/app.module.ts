import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { ExpenseComponent } from './expense/expense.component';
import { InsightsComponent } from './insights/insights.component';
import { EarningComponent } from './earning/earning.component';
import { ReceivingComponent } from './receiving/receiving.component';
import { PayingComponent } from './paying/paying.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    InsightsComponent,
    EarningComponent,
    ReceivingComponent,
    PayingComponent
  ],
  imports: [
    BrowserModule,
    FlashMessagesModule.forRoot(),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
