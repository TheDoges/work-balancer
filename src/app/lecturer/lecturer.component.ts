import { Component, OnInit } from '@angular/core';
import { LecturerService } from '../shared/services/lecturer.service';
import { Lecturer } from '../shared/models/lecturer';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { TitleService } from '../shared/services/title.service';
import { Title } from '../shared/models/title';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})
export class LecturerComponent implements OnInit {

  editedRow: Lecturer;
  lastIndex: number;
  lecturers: Lecturer[];
  titles: Title[];
  dataChange: Subject<Lecturer[]> = new Subject<Lecturer[]>();
  dataSource = new LecturerDataSource(this.dataChange);

  constructor(private lecturerService: LecturerService, private titleService: TitleService) { }

  ngOnInit() {
    this.lecturerService.getAll()
    .subscribe(lecturers => {
      this.lecturers = lecturers;
      this.dataChange.next(lecturers);
    });

    this.titleService.getAll()
    .subscribe(titles => this.titles = titles);
  }

  isEditableRow = (_, row) => {
    return row === this.editedRow;
  }

  addLecturer() {
    const row = new Lecturer();
    const lastRow = this.editedRow;
    const lastIndex = this.lastIndex;
    this.lastIndex = 0;
    this.editedRow = row;
    this.lecturers.unshift(row);
    this.refreshElementPredicate(0, row);
    if (lastRow) {
      this.refreshElementPredicate(lastIndex+1, lastRow)
    }
  }

  editLecturer(element, event, index) {
    const lastElement = this.editedRow;
    const lastIndex = this.lastIndex;
    this.editedRow = element;
    this.lastIndex = index;
    this.refreshElementPredicate(index,element);
    if (lastElement) {
      this.lecturerService.save(lastElement).toPromise();
      this.refreshElementPredicate(lastIndex, lastElement);
    }
    event.stopPropagation();
  }

  saveLecturer(element, event, index) {
    this.editedRow = null;
    this.lastIndex = null;
    this.refreshElementPredicate(index,element);
    this.lecturerService.save(element)
    .subscribe(subject => {});
    event.stopPropagation();
  }

  compareTitles(a: Title, b:Title) {
    return a.id === b.id;
  }

  private refreshElementPredicate(index, element) {
    this.lecturers.splice(index,1);
    this.dataChange.next(this.lecturers);
    this.lecturers = this.lecturers.slice(0, index).concat([element]).concat(this.lecturers.slice(index));
    this.dataChange.next(this.lecturers);
  }

}

class LecturerDataSource extends DataSource<any> {

  constructor(private dataChange) {
    super();
  }
  connect(): Observable<any> { 
    return this.dataChange;
  }

  disconnect() {}
}
