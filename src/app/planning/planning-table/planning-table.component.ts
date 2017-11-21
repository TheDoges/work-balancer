import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Rx';
import { element } from 'protractor';
import { MatDialog } from '@angular/material';
import { ProfessorSelectComponent } from '../professor-select/professor-select.component';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.css']
})
export class PlanningTableComponent implements OnInit {
  displayedColumns = ['name', 'total', 'proffessors', 'hours'];
  dataSource = new ExampleDataSource();
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  remove(element: Element, index: number) {
    element.professors.splice(index, 1);
    element.hours = this.calculateHours(element);
  }

  addProfessor(element: Element) {
    const dialogRef = this.dialog.open(ProfessorSelectComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(data => {
      element.professors.push(data.professor);
      element.hours = this.calculateHours(element);
    });
  }

  private calculateHours(element: Element) {
    return element.professors.reduce((total, professor) => {
      return total + professor.hours;
    }, 0);
  }

}

export interface Professor {
  name: string;
  hours: number;
}

export interface Element {
  name: string;
  hours: number;
  total: number;
  professors: Professor[];
}

const data: Element[] = [
  {name: 'Test', hours: 10, total: 50, professors: [{name: 'Piesel', hours: 10}]}
];


export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
  }

  disconnect() {}
}
