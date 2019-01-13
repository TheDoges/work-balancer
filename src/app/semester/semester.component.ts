import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../shared/services/semester.service';
import { Semester } from '../shared/models/semester';
import { Subject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  semesters: Semester[];
  dataChange: Subject<Semester[]> = new Subject<Semester[]>();
  dataSource = new SemesterDataSource(this.dataChange);
  editedRow: Semester;
  lastIndex: number;

  constructor(private semesterService: SemesterService) { }

  ngOnInit() {
    this.semesterService.getAll()
    .subscribe(semesters => {
      this.semesters = semesters;
      this.dataChange.next(semesters);
    });
  }

  isEditableRow = (_, row) => {
    return row === this.editedRow;
  }

  addSemester() {
    const row = new Semester();
    const lastRow = this.editedRow;
    const lastIndex = this.lastIndex;
    this.lastIndex = 0;
    this.editedRow = row;
    this.semesters.unshift(row);
    this.refreshElementPredicate(0, row);
    if (lastRow) {
      this.refreshElementPredicate(lastIndex+1, lastRow)
    }
  }

  editSemester(element, event, index) {
    const lastElement = this.editedRow;
    const lastIndex = this.lastIndex;
    this.editedRow = element;
    this.lastIndex = index;
    this.refreshElementPredicate(index,element);
    if (lastElement) {
      this.semesterService.save(lastElement).toPromise();
      this.refreshElementPredicate(lastIndex, lastElement);
    }
    event.stopPropagation();
  }

  saveSemester(element, event, index) {
    this.editedRow = null;
    this.lastIndex = null;
    this.refreshElementPredicate(index,element);
    this.semesterService.save(element)
    .subscribe(response => {
      debugger;
      element.deserialize(response.data)
    });
    event.stopPropagation();
  }

  deleteSemester(semesterToRemove: Semester) {
    const observable = this.semesterService.delete(semesterToRemove);
    if (observable) {
      observable.subscribe(() => {
        this.semesters = this.semesters.filter(semester => semester.id !== semesterToRemove.id);
        this.dataChange.next(this.semesters);
        this.semesterService.getSelected()
        .subscribe((semester: Semester) => {
          if(semester !== null && semester.id === semesterToRemove.id) {
            this.semesterService.setSelected(null);
          }
        })
      })
    }
  }

  copySemester(semester: Semester) {
    const newSemester = new Semester();
    newSemester.template = semester;
    const lastRow = this.editedRow;
    const lastIndex = this.lastIndex;
    this.lastIndex = 0;
    this.editedRow = newSemester;
    this.semesters.unshift(newSemester);
    this.refreshElementPredicate(0, newSemester);
    if (lastRow) {
      this.refreshElementPredicate(lastIndex+1, lastRow)
    }
  }

  cancelSemester(semesterToRemove: Semester) {
    this.semesters = this.semesters.filter(semester => semester !== semesterToRemove);
    this.lastIndex = null;
    this.editedRow = null;
    this.dataChange.next(this.semesters);
  }

  private refreshElementPredicate(index, element) {
    this.semesters.splice(index,1);
    this.dataChange.next(this.semesters);
    this.semesters = this.semesters.slice(0, index).concat([element]).concat(this.semesters.slice(index));
    this.dataChange.next(this.semesters);
  }

}
class SemesterDataSource extends DataSource<any> {

  constructor(private dataChange) {
    super();
  }
  connect(): Observable<any> { 
    return this.dataChange;
  }

  disconnect() {}
}
