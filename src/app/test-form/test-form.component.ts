import { Component, OnInit } from '@angular/core';

import { ClientService } from '../client.service';
import { Client, GenderType, MaritalStatus } from '../client';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  client: Client;
  genders: GenderType[]; // = [{id:1, name: 'Kobieta'}, {id:2, name: 'Mezczyzna'}];
  maritalStatuses: MaritalStatus[];
  selectedGender: number;
  selectedMaritalStatus: number;
  errors: string[] = [];
  fields: string[] = [];
  peselFlag = false;
  nipFlag = false;
  firstNameFlag = false;
  lastNameFlag = false;
  fieldsObservable: Observable<Array<string>>;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.client = new Client();
    this.client =   {
      id: NaN,
      firstName: '',
      lastName: '',
      pesel: '',
      nip: '',
      };

    this.clientService.getGenderTypes().subscribe(genders => {
      this.genders = genders;
    });
    this.clientService.getMaritalStatuses().subscribe(maritalStatuses => {
      this.maritalStatuses = maritalStatuses;
    });

    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i] === 'pesel') { this.peselFlag = true; }
      if (this.fields[i] === 'nip') { this.nipFlag = true; }
      if (this.fields[i] === 'firstName') { this.firstNameFlag = true; }
      if (this.fields[i] === 'lastName') { this.lastNameFlag = true; }
    }
  }

  save() {
    switch (this.selectedGender) {
      case 1: {
        this.client.gender = { id: 1, name: 'Kobieta' };
        break;
      }
      case 2: {
        this.client.gender = { id: 2, name: 'Mężczyzna' };
        break;
      }
      default: {
        this.client.gender = { id: 3, name: 'Inne' };
      }
    }
    switch (this.selectedMaritalStatus) {
      case 1: {
        this.client.maritalStatus = { id: 1, name: 'Kawaler / Panna' };
        break;
      }
      case 2: {
        this.client.maritalStatus = { id: 2, name: 'Żonaty / Zamężna' };
        break;
      }
      case 3: {
        this.client.maritalStatus = { id: 3, name: 'Wdowiec / Wdowa' };
        break;
      }
      case 4: {
        this.client.maritalStatus = { id: 4, name: 'Rozwiedziony / Rozwiedziona' };
        break;
      }
      default: {
        this.client.maritalStatus = { id: 5, name: 'Inne' };
      }
    }
    console.log(this.client);
    this.clientService.saveClient(this.client).subscribe(
      result => {
      },
      errors => {
        console.log(errors);
        // tslint:disable-next-line:triple-equals
        if (errors.status == 409) {
          this.errors = errors.error.map((error) => {
            return error.defaultMessage;
          });
          this.fields = errors.error.map((error) => {
            return error.field;
          });
        } else {
          this.errors = errors.message;
          }
        });
      }
  }

