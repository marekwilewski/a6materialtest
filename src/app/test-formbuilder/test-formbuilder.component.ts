import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl,
  FormGroupDirective, NgForm, FormGroup, FormArray } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { Client, GenderType, MaritalStatus } from '../client';
import { ClientService } from '../client.service';
import { PeselSumValidator } from '../pesel-SumCheck-Validator';
import { NipSumValidator } from '../nip-SumCheck-Validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-test-formbuilder',
  templateUrl: './test-formbuilder.component.html',
  styleUrls: ['./test-formbuilder.component.css']
})
export class TestFormbuilderComponent implements OnInit {

  client: Client;
  genders: GenderType[];
  maritalStatuses: MaritalStatus[];
  clientForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private builder: FormBuilder, private clientService: ClientService) {
    this.clientForm = this.builder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z ąćęłńóżźŚ.-]+$')]],
      birthDate: new Date(''),
      pesel: ['', [Validators.minLength(11), PeselSumValidator.peselSumValidator]],
      nip: ['', [Validators.minLength(10), NipSumValidator.nipSumValidator]],
      genderType: new GenderType,
      maritalStatusType: new MaritalStatus
    });
  }

  ngOnInit() {
    this.client = new Client();
    this.clientService.getGenderTypes().subscribe(genders => {
      this.genders = genders;
    });
    this.clientService.getMaritalStatuses().subscribe(maritalStatuses => {
      this.maritalStatuses = maritalStatuses;
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which;
    if (charCode > 47 && charCode < 58 || charCode > 45 && charCode < 47)  {
      return true;
    }
    return false;
  }

  letterOnly(event): boolean {
    const charCode = event.which;
    if (((charCode > 38 && charCode !== 40 && charCode !== 41 && charCode !== 42
        && charCode !== 43 && charCode !== 44) || charCode === 32)
    && (charCode < 48 || (charCode > 57  && charCode !== 64))) {
      return true;
    }
    return false;
  }

  onSubmit() {
    this.client.firstName = this.clientForm.value.firstName;
    this.client.lastName = this.clientForm.value.lastName;
    this.client.pesel = this.clientForm.value.pesel;
    this.client.nip = this.clientForm.value.nip;
    this.client.birthDate = this.clientForm.value.birthDate.format('l');
    switch (this.clientForm.value.genderType) {
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
    switch (this.clientForm.value.maritalStatusType) {
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

    this.clientService.saveClient(this.client).subscribe(
      result => {
      },
      errors => {
        if (errors.status === 409) {
          errors = errors.error.map((error) => {
            return error.defaultMessage;
          });
        } else {
          errors = errors.message;
        }
        console.log(errors);
      });
  }

}
