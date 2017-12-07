import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfessorService } from '../shared/services/professor.service';
import Professor from '../shared/models/professor';
import Class from '../shared/models/class';
import { ClassService } from '../shared/services/class.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  private professors: Professor[] = [];
  filteredProfessors: Professor[] = [];
  classes: Class[] = [];
  lecture: Class;

  @ViewChild('sideNav') sideNav: MatSidenav;

  constructor(private professorService: ProfessorService, private classService: ClassService) { }

  ngOnInit() {
    this.filteredProfessors = this.professors = this.professorService.getAll();
    this.classes = this.classService.getAll();
  }

  setLecture(lecture: Class) {
    this.lecture = lecture;
    this.sideNav.close();
    this.sideNav.open();
  }

  filterProfessors(query: string) {
    this.filteredProfessors = this.professors.filter(professor => professor.name.includes(query));
  }

}
