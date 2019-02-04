import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { ClientService } from '../client.service';
import { Client } from '../client';
import { CurrentClientService } from '../current-client.service';

@Component({
  selector: 'app-test-list',
  providers: [ClientService],
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  clients: Client[];
  dataSource: MatTableDataSource<Client>;
  filter: Client = new Client();
  selectedRowIndex = -1;
  clientToEdit = new Client();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate',
    'pesel', 'nip', 'genderName', 'maritalStatusName'];

  constructor(private clientService: ClientService,
    private currentClientService: CurrentClientService) {
  }

  ngOnInit() {
    this.paginator.page.subscribe(event => {
      this.refresh();
    });
    this.paginator.pageSize = 10;

    this.sort.sortChange.subscribe(event => {
      this.refresh();
    });
    this.refresh();
  }

  refresh() {
    let reqparams = new HttpParams()
      .set('page', this.paginator.pageIndex.toString() || '0')
      .append('size', this.paginator.pageSize.toString() || '10');

    // tslint:disable-next-line:prefer-const
    let sortField = this.sort.direction !== '' ? this.sort.active + ',' + this.sort.direction : '';

    if (sortField !== '') {
      reqparams = reqparams.append('sort', sortField);
    }

    // tslint:disable-next-line:prefer-const
    for (let key in this.filter) {
      if (this.filter.hasOwnProperty(key)) {
        reqparams = reqparams.append(key, this.filter[key]);
      }
    }

    this.clientService.getClients({ params: reqparams }).subscribe(clients => {
      this.dataSource = new MatTableDataSource<Client>(clients.content);
      this.dataSource.sort = this.sort;
      this.paginator.length = clients.totalElements;
      this.paginator.pageIndex = clients.number;
      this.paginator.pageSize = clients.size;
    });
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.currentClientService.setCurrentClient(row);
  }

  delete() {
    this.clientService.deleteClient(this.currentClientService.getCurrentClient()).subscribe(
      result => {
      },
      errors => {
        console.log('test', errors);
      });
      window.location.reload();
  }
}
