import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { LecturerService } from '../shared/services/lecturer.service';
import { Lecturer } from '../shared/models/lecturer';
import { SubjectService } from '../shared/services/subject.service';
import { Subject } from '../shared/models/subject';
import { Semester } from '../shared/models/semester';
import { SemesterService } from '../shared/services/semester.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit, OnDestroy {
  private lecturers: Lecturer[] = [];
  filteredLecturers: Lecturer[] = [];
  subjects: Subject[] = [];
  subject: Subject;
  selectedSemester: Semester;
  semesters: Semester[];
  currentSemesterSubscription: Subscription;
  
  @ViewChild('sideNav') sideNav: MatSidenav;
  
  constructor(private lecturerService: LecturerService, private subjectService: SubjectService, private semesterService: SemesterService) { }
  
  ngOnInit() {
    this.semesterService.getAll()
    .subscribe(semesters => this.semesters = semesters)

    this.currentSemesterSubscription = this.semesterService.getSelected()
    .subscribe(semester => {
      if (semester) {
        this.selectedSemester = semester;
        // this.subjectService.getAllForSemester(semester)
        // .subscribe(subjects => this.subjects = subjects)
      }

    })

    this.lecturerService.getAll()
    .subscribe(lecturers => {
      this.lecturers = lecturers;
      this.filteredLecturers = lecturers;
    })
    // this.lecturerService.getAll()
    // .subscribe(lecturers => {
    //   this.lecturers = lecturers;
    //   this.filteredLecturers = lecturers;
    // })
    // this.subjectService.getAll()
    //   .subscribe(subjects => this.subjects = subjects)
  }

  ngOnDestroy(): void {
    this.currentSemesterSubscription.unsubscribe();
  }
  
  setSubject(subject: Subject) {
    this.subject = subject;
    this.sideNav.close();
    this.sideNav.open();
  }

  setSemester(semester: Semester) {
    this.semesterService.setSelected(semester);
  }

  compareSemesters(a: Semester, b: Semester) {
    return a.id === b.id;
  }
  
  filterLecturers(query: string) {
    query = query.toLowerCase();
    this.filteredLecturers = this.lecturers.filter(lecturer => lecturer.name.toLowerCase().includes(query) || lecturer.surname.toLowerCase().includes(query));
  }
  
}
