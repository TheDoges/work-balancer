import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Rx';
import { element } from 'protractor';
import { MatDialog, MatTableDataSource, MatRow } from '@angular/material';
import { ProfessorSelectComponent } from '../professor-select/professor-select.component';
import Lecture from '../../shared/models/class';
import Professor from '../../shared/models/professor';
import Job from '../../shared/models/job';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.css']
})
export class PlanningTableComponent implements OnInit {
  @Input() professors: Professor[];
  @Input() classes: Lecture[];
  @Output() lectureChange: EventEmitter<Lecture> = new EventEmitter<Lecture>();
  displayedColumns = ['name', 'total', 'proffessors', 'hours'];
  dataSource: MatTableDataSource<Lecture>;
  selectedClassId: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Lecture>(this.classes);
  }

  removeJob(lecture: Lecture, index: number) {
    lecture.deleteJob(index);
  }

  addJob(lecture: Lecture) {
    const job: Job = new Job();
    job.hours = 0;
    const dialogRef = this.dialog.open(ProfessorSelectComponent, {
      data: {
        job: job,
        professors: this.professors,
        max: lecture.total - lecture.hours
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        lecture.addJob(data.job);
      }
    });
  }

  editJob(lecture: Lecture, index: number, job: Job) {
    const dialogRef = this.dialog.open(ProfessorSelectComponent, {
      data: {
        job: {...job},
        professors: this.professors,
        max: lecture.total - lecture.hours + job.hours
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        lecture.updateJob(index, data.job);
      }
    });
  }

  selectClass(lecture: Lecture) {
    this.selectedClassId = lecture.name;
    this.lectureChange.next(lecture);
  }

}
