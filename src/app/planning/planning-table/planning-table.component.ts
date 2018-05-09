import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Rx';
import { element } from 'protractor';
import { MatDialog, MatTableDataSource, MatRow, Sort, MatSort } from '@angular/material';
import { ProfessorSelectComponent } from '../professor-select/professor-select.component';
import { Lecturer } from '../../shared/models/lecturer';
import { Subject } from '../../shared/models/subject';
import { SubjectService } from '../../shared/services/subject.service';
import { Link } from '../../shared/models/link';
import { LinkService } from '../../shared/services/link.service';
import { SemesterService } from '../../shared/services/semester.service';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html',
  styleUrls: ['./planning-table.component.css']
})
export class PlanningTableComponent implements OnInit {
  @Input() lecturers: Lecturer[];
  subjects: Subject[];
  @Output() subjectChange: EventEmitter<Subject> = new EventEmitter<Subject>();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['name', 'type', 'degree', 'fieldName', 'fieldType', 'total', 'proffessors', 'hours'];
  dataSource: MatTableDataSource<Subject>;
  // sortedData: Subject[];
  
  constructor(private subjectService: SubjectService, private linkService: LinkService, private semesterService: SemesterService, private dialog: MatDialog) { }
  
  ngOnInit() {
    this.semesterService.getSelected()
    .subscribe(semester => {

      if(semester) {
        this.subjectService.getAllWithLinksForSemester(semester)
        .subscribe(subjects => {
          this.subjects = subjects;
          // this.sortedData = this.subjects;
          this.dataSource = new MatTableDataSource<Subject>(this.subjects);
          this.dataSource.sortingDataAccessor = (item: Subject, property: string) => {
            switch(property) {
              case 'degree': return item.degree.prefix;
              case 'fieldName': return item.field.name;
              case 'fieldType': return item.field.type;
              default: return item[property];
            }
          };
          this.dataSource.sort = this.sort;
          this.connectLinks(subjects, this.lecturers);
        })
      }
      
    })
  }
  
  removeLink(subject: Subject, index: number, link: Link) {
    const observable = this.linkService.delete(link);
    if (observable) {
      observable.toPromise();
    }
  }
  
  addLink(subject: Subject) {
    const link: Link = new Link();
    link.subject = subject;
    link.hours = 0;
    const dialogRef = this.dialog.open(ProfessorSelectComponent, {
      data: {
        link: link,
        lecturers: this.lecturers,
        max: subject.hours - subject.linkHours,
        type: subject.type
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        const observable = this.linkService.add(data.link, subject, data.link.lecturer);
        if (observable) {
          observable.subscribe(response => {
            data.link.id = response.data.id.toString();
          })
        }
      }
    });
  }
  
  editLink(subject: Subject, index: number, link: Link) {
    const lecturer = link.lecturer;
    const dialogRef = this.dialog.open(ProfessorSelectComponent, {
      data: {
        link: link,
        lecturers: this.lecturers,
        max: subject.hours - subject.linkHours + link.hours,
        type: subject.type
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        const observable = this.linkService.update(data.link, subject, lecturer);
        if (observable) {
          observable.toPromise()
        }
      }
    });
  }
  
  selectSubject(subject: Subject) {
    this.subjectChange.next(subject);
  }

  updateSubjectHours(subject: Subject) {
    this.subjectService.save(subject).toPromise()
  }

  private connectLinks(subjects: Subject[], lecturers: Lecturer[]) {
    lecturers.forEach(lecturer => lecturer.clearLinks())
    subjects.forEach(subject => {
      if (subject.links.length) {
        subject.links.forEach(link => {
          const lecturer = this.lecturers.find(lecturer => lecturer.id === link.lecturer_id);
          if (lecturer) {
            link.lecturer = lecturer;
            lecturer.addLink(link);
          }
        })
      }
    })
  }
}