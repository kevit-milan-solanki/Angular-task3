import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {DetailFormComponent} from './detail-form/detail-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {DetailComponent} from './detail-form/detail/detail.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import {DemoComponent} from './demo/demo.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule} from "ngx-toastr";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ConformComponent} from './shaird/conform/conform.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailFormComponent,
    DetailComponent,
    DemoComponent,
    ConformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxIntlTelInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
    ToastrModule.forRoot({
        timeOut: 3000,
        progressBar: true
      }
    ),
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DetailFormComponent]
})
export class AppModule {
}
