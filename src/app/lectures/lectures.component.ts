import {Component, Pipe, PipeTransform, OnInit} from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { StudyService } from '../shared/services/study.service';
import { StudyKindService } from '../shared/services/study-kind.service';
import { StudyFormService } from '../shared/services/study-form.service';
import Study from '../shared/models/study';
import StudyKind from '../shared/models/studyKind';
import StudyForm from '../shared/models/studyForm';

@Pipe({
  name: 'studyFormName'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    return "DOGE";
  }
}

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('.5s ease')),
    ]),
  ],
})
export class LecturesComponent implements OnInit{
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>(ELEMENT_DATA);
  dataSource = new ExampleDataSource(this.dataChange);
  expandedElement;
  editedRow;
  studyForms: StudyForm[] = [];
  studyKinds: StudyKind[] = [];
  studies: Study[] = [];

  constructor(private studyService: StudyService, private studyKindService: StudyKindService, private studyFormService: StudyFormService) {}
  
  ngOnInit(): void {
    this.studyService.getAll()
    .subscribe(studies => this.studies = studies);

    this.studyKindService.getAll()
    .subscribe(studyKinds => this.studyKinds = studyKinds);

    this.studyFormService.getAll()
    .subscribe(studyForms => this.studyForms = studyForms);
  }

  isExpansionDetailRow = (_, row) => row.hasOwnProperty('detailRow');
  isEditableRow = (_, row) => {
    return row === this.editedRow;
  }

  addLecture() {
    const row = {name: null, study: null, studyKind: null, studyForm: null};
    const lastRow = this.editedRow;
    this.editedRow = row;
    if (lastRow) {
      ELEMENT_DATA.shift();
      this.dataChange.next(ELEMENT_DATA);
      ELEMENT_DATA.unshift(lastRow);

    }
    ELEMENT_DATA.unshift(row);
    this.dataChange.next(ELEMENT_DATA);
    // this.dataSource = ELEMENT_DATA;
  }

  editLecture(element, event, index) {
    this.editedRow = element;
    // element.name = "Piesel";
    ELEMENT_DATA.splice(index,1);
    this.dataChange.next(ELEMENT_DATA);
    ELEMENT_DATA = ELEMENT_DATA.slice(0, index-1).concat([element]).concat(ELEMENT_DATA.slice(index-1));
    this.dataChange.next(ELEMENT_DATA);
    event.stopPropagation();
  }
}

export interface Lecture {
  name: string;
  study: Study;
  studyKind: StudyKind;
  studyForm: StudyForm;
}

let ELEMENT_DATA: Lecture[] = [
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  // // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  // // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  // // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  // // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  // // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  // // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  // // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  // // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  // // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  // // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

const rows = [];
ELEMENT_DATA.forEach(element => rows.push(element, {detailRow: true, element}));
ELEMENT_DATA = rows;

export class ExampleDataSource extends DataSource<any> {

  constructor(private dataChange) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> { 
    return this.dataChange;
  }

  disconnect() {}
}