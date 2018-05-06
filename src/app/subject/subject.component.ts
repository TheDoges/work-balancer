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
import { Semester } from '../shared/models/semester';
import { SemesterService } from '../shared/services/semester.service';

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
  selectedSemester: Semester;
  semesters: Semester[];
  
  subjects: Subject[];
  degrees: Degree[];
  subjectTypes: SubjectType[];
  
  constructor(private degreeService: DegreeService, private subjectService: SubjectService, private semesterService: SemesterService) {}
  
  ngOnInit(): void {
    this.semesterService.getAll()
    .subscribe(semesters => this.semesters = semesters);

    this.semesterService.getSelected()
    .subscribe(semester => {
      if (semester) {
        this.selectedSemester = semester;
          this.subjectService.getAllForSemester(semester)
        .subscribe(subjects => {
          this.subjects = subjects;
          this.dataChange.next(subjects);
        });
      }
    })
    
    this.subjectService.getSubjectTypes()
    .subscribe(subjectTypes => this.subjectTypes = subjectTypes);
    
    this.degreeService.getAll()
    .subscribe(degrees => this.degrees = degrees);
  }
  
  isExpansionDetailRow = (_, row) => row.hasOwnProperty('detailRow');
  isEditableRow = (_, row) => {
    return row === this.editedRow;
  }
  
  addSubject() {
    const semester = new Subject();
    semester.semester = this.selectedSemester;
    const lastRow = this.editedRow;
    const lastIndex = this.lastIndex;
    this.lastIndex = 0;
    this.editedRow = semester;
    this.subjects.unshift(semester);
    this.refreshElementPredicate(0, semester);
    if (lastRow) {
      this.refreshElementPredicate(lastIndex+1, lastRow)
    }
  }
  
  editSubject(element, event, index) {
    const lastElement = this.editedRow;
    const lastIndex = this.lastIndex;
    this.editedRow = element;
    this.lastIndex = index;
    this.refreshElementPredicate(index,element);
    if (lastElement) {
      this.subjectService.save(lastElement).toPromise();
      this.refreshElementPredicate(lastIndex, lastElement);
    }
    event.stopPropagation();
  }
  
  saveSubject(element, event, index) {
    this.editedRow = null;
    this.lastIndex = null;
    this.refreshElementPredicate(index,element);
    this.subjectService.save(element)
    .subscribe(subject => {});
    event.stopPropagation();
  }

  cancelSubject(subjectToRemove: Subject) {
    this.subjects = this.subjects.filter(subject => subject !== subjectToRemove);
    this.lastIndex = null;
    this.editedRow = null;
    this.dataChange.next(this.subjects);
  }

  deleteSubject(subjectToRemove: Subject) {
    const observable = this.subjectService.delete(subjectToRemove);
    if (observable) {
      observable.subscribe(() => {
        this.subjects = this.subjects.filter(subject => subject.id !== subjectToRemove.id);
        this.dataChange.next(this.subjects);
      })
    }
  }

  setSemester(semester: Semester) {
    this.semesterService.setSelected(semester);
  }
  
  private refreshElementPredicate(index, element) {
    this.subjects.splice(index,1);
    this.dataChange.next(this.subjects);
    this.subjects = this.subjects.slice(0, index).concat([element]).concat(this.subjects.slice(index));
    this.dataChange.next(this.subjects);
  }

  compareSemesters(a: Semester, b: Semester) {
    return a.id === b.id;
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