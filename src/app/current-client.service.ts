import { Injectable } from '@angular/core';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class CurrentClientService {

  private currentClient = new Client;


  constructor() {
  }

  getCurrentClient() {
    return this.currentClient;
  }

  setCurrentClient(client: Client) {
    this.currentClient = client;
  }
}
