import {Component, Pipe, PipeTransform, OnInit} from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { DataSource } from '@angular/cdk/table';
import * as rxjs from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { SubjectService } from '../shared/services/subject.service';
import { Subject, SubjectType } from '../shared/models/subject';
import { Degree } from '../shared/models/degree';
import { DegreeService } from '../shared/services/degree.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('.5s ease')),
    ]),
  ],
})
export class SubjectComponent implements OnInit{
  dataChange: rxjs.Subject<Subject[]> = new rxjs.Subject<Subject[]>();
  dataSource = new ExampleDataSource(this.dataChange);
  expandedElement;
  editedRow;
  lastIndex;

  subjects: Subject[];
  degrees: Degree[];
  subjectTypes: SubjectType[];

  constructor(private degreeService: DegreeService, private subjectService: SubjectService) {}
  
  ngOnInit(): void {
    this.subjectService.getAll()
    .subscribe(subjects => {
      this.subjects = subjects;
      this.dataChange.next(subjects);
    });

    this.subjectService.getSubjectTypes()
    .subscribe(subjectTypes => this.subjectTypes = subjectTypes);

    this.degreeService.getAll()
    .subscribe(degrees => this.degrees = degrees);
  }

  isExpansionDetailRow = (_, row) => row.hasOwnProperty('detailRow');
  isEditableRow = (_, row) => {
    return row === this.editedRow;
  }

  addLecture() {
    const row = new Subject();
    const lastRow = this.editedRow;
    const lastIndex = this.lastIndex;
    this.lastIndex = 0;
    this.editedRow = row;
    this.subjects.unshift(row);
    this.refreshElementPredicate(0, row);
    if (lastRow) {
      this.refreshElementPredicate(lastIndex+1, lastRow)
    }
  }

  editLecture(element, event, index) {
    const lastElement = this.editedRow;
    const lastIndex = this.lastIndex;
    this.editedRow = element;
    this.lastIndex = index;
    this.refreshElementPredicate(index,element);
    if (lastElement) {
      this.refreshElementPredicate(lastIndex, lastElement);
    }
    event.stopPropagation();
  }

  saveLecture(element, event, index) {
    this.editedRow = null;
    this.lastIndex = null;
    this.refreshElementPredicate(index,element);
    this.subjectService.save(element)
    .subscribe(subject => {});
    event.stopPropagation();
  }

  private refreshElementPredicate(index, element) {
    this.subjects.splice(index,1);
    this.dataChange.next(this.subjects);
    this.subjects = this.subjects.slice(0, index).concat([element]).concat(this.subjects.slice(index));
    this.dataChange.next(this.subjects);
  }

  compareDegrees(a: Degree, b:Degree) {
    return a.id === b.id;
  }
}

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