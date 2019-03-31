import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ConsultantsListComponent } from './consultants/consultants-list.component';
import { ConsultantCardComponent } from './consultants/consultant-card.component';
import { ConsultantDetailsComponent } from './consultants/consultant-details.component';
import { ConsultantEditComponent } from './consultants/consultant-edit.component';

import { NotFoundComponent } from './consultants/shared/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DemoMaterialModule } from './material-module';
import { ConsultantEditGuard } from './consultants/consultant-edit.guard';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ConsultantsListComponent,
    ConsultantCardComponent,
    ConsultantDetailsComponent,
    ConsultantEditComponent,
    NotFoundComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot([
      { path: 'index', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'consultants/details',
        component: ConsultantDetailsComponent,
      },
      {
        path: 'consultants/edit',
        canDeactivate: [ConsultantEditGuard],
        component: ConsultantEditComponent,
      },
      {
        path: 'consultants',
        component: ConsultantsListComponent,
      },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
