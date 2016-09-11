import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { IndividualsComponent }      from './individuals.component';
import { IndividualDetailComponent }  from './individual-detail.component';
import { IndividualService }          from './individual.service';
// import { IndividualSearchComponent }  from './individual-search.component';
import { routing }              from './app.routing';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    IndividualDetailComponent,
    IndividualsComponent
    //IndividualSearchComponent
  ],
  providers: [
    IndividualService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
