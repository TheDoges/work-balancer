import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Rx';
import { element } from 'protractor';
import { MatDialog, MatTableDataSource, MatRow } from '@angular/material';
import { ProfessorSelectComponent } from '../professor-select/professor-select.component';
import Lecture from '../../shared/models/class';
import Professor from '../../shared/models/professor';
import Job from '../../shared/models/job';
import { Lecturer } from '../../shared/models/lecturer';
import { Subject } from '../../shared/models/subject';
import { SubjectService } from '../../shared/services/subject.service';
import { Link } from '../../shared/models/link';
import { LinkService } from '../../shared/services/link.service';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.css']
})
export class PlanningTableComponent implements OnInit {
  @Input() lecturers: Lecturer[];
  @Input() subjects: Subject[];
  @Output() subjectChange: EventEmitter<Subject> = new EventEmitter<Subject>();
  displayedColumns = ['name', 'total', 'proffessors', 'hours'];
  dataSource: MatTableDataSource<Subject>;

  constructor(private subjectService: SubjectService, private linkService: LinkService, public dialog: MatDialog) { }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource<Subject>(this.subjects);
    this.subjectService.getAllForSemester(null)
    .subscribe(subjects => {
      this.dataSource = new MatTableDataSource<Subject>(this.subjects);
      this.subjects = subjects;
    })
  }

  removeLink(subject: Subject, index: number, link: Link) {
    this.linkService.delete(link);
  }

  addLink(subject: Subject) {
    const link: Link = new Link();
    link.subject = subject;
    link.hours = 0;
    const dialogRef = this.dialog.open(ProfessorSelectComponent, {
      data: {
        link: link,
        lecturers: this.lecturers,
        max: subject.hours - subject.linkHours
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.linkService.add(data.link, subject, data.link.lecturer);
      }
    });
  }

  editLink(subject: Subject, index: number, link: Link) {
    const dialogRef = this.dialog.open(ProfessorSelectComponent, {
      data: {
        link: {...link},
        lecturers: this.lecturers,
        max: subject.hours - subject.linkHours + link.hours
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.linkService.update(data.link, subject, link.lecturer);
      }
    });
  }

  selectSubject(subject: Subject) {
    this.subjectChange.next(subject);
  }

}
