import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-new-table',
    templateUrl: './new-table.component.html',
    styleUrls: ['./new-table.component.css']
})


export class NewTableComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    clients: Client[];
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate',
        'pesel', 'nip', 'genderName', 'maritalStatusName'];
    referenceColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate',
        'pesel', 'nip', 'genderName', 'maritalStatusName'];
    dataSource;
    firstNameCheck = true;
    lastNameCheck = true;
    birthDateCheck = true;
    peselCheck = true;
    nipCheck = true;
    genderCheck = true;
    martialCheck = true;

    constructor(private clientService: ClientService) {
        console.log('constructor');
    }

    ngOnInit() {
        this.clientService.getAllClients().subscribe(clients => {
            this.dataSource = new MatTableDataSource<Client>(clients);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
        console.log('ngOnInit');
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
}
