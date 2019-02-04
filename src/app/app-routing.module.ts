import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestListComponent } from './test-list/test-list.component';
import { TestFormComponent } from './test-form/test-form.component';
import { TestEditComponent } from './test-edit/test-edit.component';
import { TestReactiveFormComponent } from './test-reactive-form/test-reactive-form.component';
import { TestFormReactiveComponent } from './test-form-reactive/test-form-reactive.component';
import { TestFormbuilderComponent } from './test-formbuilder/test-formbuilder.component';
import { MapTableComponent } from './map-table/map-table.component';
import { NewTableComponent } from './new-table/new-table.component';


const routes: Routes = [
  { path: 'list', component: TestListComponent },
  { path: 'form', component: TestFormComponent },
  { path: 'edit', component: TestEditComponent },
  { path: 'reactiveForm', component: TestReactiveFormComponent },
  { path: 'formReactive', component: TestFormReactiveComponent },
  { path: 'formBuilder', component: TestFormbuilderComponent },
  { path: 'mapTable', component: MapTableComponent },
  { path: 'newTable', component: NewTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]})
export class AppRoutingModule { }
