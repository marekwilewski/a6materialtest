import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client, GenderType, MaritalStatus, PagedResponse } from './client';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client: Client;

  constructor(private http: HttpClient) {

  }

  getClients(options: object): Observable<PagedResponse> {
    return this.http.get<PagedResponse>(API_ENDPOINT + '/clientsMap', options);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(API_ENDPOINT + '/clients');
  }

  getGenderTypes(): Observable<GenderType[]> {
    return this.http.get<GenderType[]>(API_ENDPOINT + '/genderTypes');
  }

  getMaritalStatuses(): Observable<MaritalStatus[]> {
    return this.http.get<MaritalStatus[]>(API_ENDPOINT + '/maritalStatuses');
  }

  putClient(client: Client) {
    console.log(API_ENDPOINT + '/clients/' + client.id.toLocaleString() + ' - ', JSON.stringify(client, null, ' '));
    this.http.put(API_ENDPOINT + '/clients/' + client.id.toLocaleString(), client).subscribe(post => console.log(post));
  }

  saveClient(client: Client): Observable<any> {
    return this.http.post(API_ENDPOINT + '/clients', client);
  }

  deleteClient(client: Client): Observable<any> {
    return this.http.delete(API_ENDPOINT + '/clients/' + client.id.toLocaleString());
  }

}
