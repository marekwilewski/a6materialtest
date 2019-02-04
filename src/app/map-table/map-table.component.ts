import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpParams } from '@angular/common/http';

import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-map-table',
  templateUrl: './map-table.component.html',
  styleUrls: ['./map-table.component.css']
})
export class MapTableComponent implements OnInit {

  clients: Client[];
  dataSource: MatTableDataSource<Client>;
  filter: Client = new Client();
  selectedRowIndex = -1;
  firstNameCheck = true;
  lastNameCheck = true;
  birthDateCheck = true;
  peselCheck = true;
  nipCheck = true;
  genderCheck = true;
  martialCheck = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  referenceColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate',
  'pesel', 'nip', 'genderName', 'maritalStatusName'];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate',
  'pesel', 'nip', 'genderName', 'maritalStatusName'];

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.paginator.page.subscribe(event => {
      this.refresh();
    });
    this.paginator.pageSize = 5;

    this.sort.sortChange.subscribe(event => {
      this.refresh();
    });
    this.refresh();
  }

  OnChange($event) {
    const columnName = $event.source.name;
    if ($event.checked) {
      this.displayedColumns.splice(this.columnPosition(columnName), 0, columnName);
    } else {
      this.displayedColumns.splice(this.displayedColumns.indexOf(columnName), 1);
    }
  }

  columnPosition(column: string): number {
    let position = 0;
    for (let i = 0; i < this.referenceColumns.indexOf(column); i++) {
      if (this.displayedColumns.indexOf(this.referenceColumns[i]) >= 0) {
        position++;
      }
    }
    return position;
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
  }

}
