import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { ClientService } from '../client.service';
import { Client, GenderType, MaritalStatus } from '../client';
import { CurrentClientService } from '../current-client.service';


@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css']
})
export class TestEditComponent implements OnInit {

  client: Client;
  genders: GenderType[]; // = [{id:1, name: 'Kobieta'}, {id:2, name: 'Mezczyzna'}];
  maritalStatuses: MaritalStatus[];
  clientToEdit: Client;
  ngControl: NgControl;
  selectedGender: number;
  selectedMartialStatus: number;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'pesel', 'nip', 'genderName', 'maritalStatusName', 'birthDate'];

  constructor(private clientService: ClientService, private currentClientService: CurrentClientService) {
    this.clientToEdit = this.currentClientService.getCurrentClient();
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

  onSubmit(event: any) {
    this.client.id = this.currentClientService.getCurrentClient().id;
    this.client.firstName = event.target.firstName.value;
    this.client.lastName = event.target.lastName.value;
    this.client.pesel = event.target.pesel.value;
    this.client.nip = event.target.nip.value;
    this.client.birthDate = event.target.birthDate.value;
    switch (this.selectedGender) {
      case 1: {
        this.client.gender = {id: 1, name: 'Kobieta'};
        break;
      }
      case 2: {
        this.client.gender = {id: 2, name: 'Mężczyzna'};
        break;
      }
      default: {
        this.client.gender = {id: 3, name: 'Inne'};
      }
    }
    switch (this.selectedMartialStatus) {
      case 1: {
        this.client.maritalStatus = {id: 1, name: 'Kawaler / Panna'};
        break;
      }
      case 2: {
        this.client.maritalStatus = {id: 2, name: 'Żonaty / Zamężna'};
        break;
      }
      case 3: {
        this.client.maritalStatus = {id: 3, name: 'Wdowiec / Wdowa'};
        break;
      }
      case 4: {
        this.client.maritalStatus = {id: 4, name: 'Rozwiedziony / Rozwiedziona'};
        break;
      }
      default: {
        this.client.maritalStatus = {id: 5, name: 'Inne'};
      }
    }
    this.clientService.putClient(this.client);
  }

}
