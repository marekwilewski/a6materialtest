import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './materialModule';
import { AppRoutingModule } from './/app-routing.module';
import { TestListComponent } from './test-list/test-list.component';
import { TestFormComponent } from './test-form/test-form.component';
import { TestEditComponent } from './test-edit/test-edit.component';
import { TestMenuComponent } from './test-menu/test-menu.component';
import { MapTableComponent } from './map-table/map-table.component';
import { NewTableComponent } from './new-table/new-table.component';
import { TestFormbuilderComponent } from './test-formbuilder/test-formbuilder.component';
import { TestReactiveFormComponent } from './test-reactive-form/test-reactive-form.component';
import { TestFormReactiveComponent } from './test-form-reactive/test-form-reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    TestListComponent,
    TestFormComponent,
    TestEditComponent,
    TestReactiveFormComponent,
    TestFormReactiveComponent,
    TestFormbuilderComponent,
    TestMenuComponent,
    MapTableComponent,
    NewTableComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
