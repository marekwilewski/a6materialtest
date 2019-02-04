import { Component, OnInit } from '@angular/core';
import { Client, GenderType, MaritalStatus } from '../client';
import { NgControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { PeselSumValidator } from '../pesel-SumCheck-Validator';
import { NipSumValidator } from '../nip-SumCheck-Validator';

@Component({
  selector: 'app-test-form-reactive',
  templateUrl: './test-form-reactive.component.html',
  styleUrls: ['./test-form-reactive.component.css']
})
export class TestFormReactiveComponent implements OnInit {

  client: Client;
  genders: GenderType[]; // = [{id:1, name: 'Kobieta'}, {id:2, name: 'Mezczyzna'}];
  maritalStatuses: MaritalStatus[];
  ngControl: NgControl;
  clientEditForm: FormGroup;
  testDate = new Date();

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.client = new Client();

    this.clientService.getGenderTypes().subscribe(genders => {
      this.genders = genders;
    });
    this.clientService.getMaritalStatuses().subscribe(maritalStatuses => {
      this.maritalStatuses = maritalStatuses;
    });

    this.clientEditForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl(new Date('')),
      pesel: new FormControl('', [Validators.minLength(11), Validators.maxLength(11), PeselSumValidator.peselSumValidator]),
      nip: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), NipSumValidator.nipSumValidator]),
      genderType: new FormControl(''),
      maritalStatusType: new FormControl('')
    });

    this.clientEditForm.setValue({
      firstName: '', lastName: '', pesel: '', nip: '', birthDate: null, genderType: '', maritalStatusType: ''
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  letterOnly(event): boolean {
    const charCode = event.which;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;
  }

  onSubmit() {
    this.client.firstName = this.clientEditForm.value.firstName;
    this.client.lastName = this.clientEditForm.value.lastName;
    this.client.pesel = this.clientEditForm.value.pesel;
    this.client.nip = this.clientEditForm.value.nip;
    this.client.birthDate = this.clientEditForm.value.birthDate;
    switch (this.clientEditForm.value.genderType) {
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
    switch (this.clientEditForm.value.maritalStatusType) {
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
    console.log('errors: ', this.clientEditForm.get('birthDate').errors);
    console.log(this.testDate);
    console.log(this.clientEditForm.value);
    console.log(this.client);
    // this.clientService.saveClient(this.client).subscribe(
    //   result => {
    //   },
    //   errors => {
    //     if (errors.status === 409) {
    //       errors = errors.error.map((error) => {
    //         return error.defaultMessage;
    //       });
    //     } else {
    //       errors = errors.message;
    //       }
    //       console.log(errors);
    //     });

  }

}
