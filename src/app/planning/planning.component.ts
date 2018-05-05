import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { LecturerService } from '../shared/services/lecturer.service';
import { Lecturer } from '../shared/models/lecturer';
import { SubjectService } from '../shared/services/subject.service';
import { Subject } from '../shared/models/subject';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  private lecturers: Lecturer[] = [];
  filteredLecturers: Lecturer[] = [];
  subjects: Subject[] = [];
  subject: Subject;

  @ViewChild('sideNav') sideNav: MatSidenav;

  constructor(private lecturerService: LecturerService, private subjectService: SubjectService) { }

  ngOnInit() {
    this.lecturerService.getAll()
    .subscribe(lecturers => {
      this.lecturers = lecturers;
      this.filteredLecturers = lecturers;
    })
    this.subjectService.getAll()
    .subscribe(subjects => this.subjects = subjects)
  }

  setSubject(subject: Subject) {
    this.subject = subject;
    this.sideNav.close();
    this.sideNav.open();
  }

  filterLecturers(query: string) {
    this.filteredLecturers = this.lecturers.filter(lecturer => lecturer.name.includes(query));
  }

}
