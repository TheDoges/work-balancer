import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfessorService } from '../shared/services/professor.service';
import Professor from '../shared/models/professor';
import Class from '../shared/models/class';
import { ClassService } from '../shared/services/class.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  professors: Professor[] = [];
  classes: Class[] = [];
  lecture: Class = new Class();

  @ViewChild('sideNav') sideNav;

  constructor(private professorService: ProfessorService, private classService: ClassService) { }

  ngOnInit() {
    this.professors = this.professorService.getAll();
    this.classes = this.classService.getAll();
  }

  setLecture(lecture: Class) {
    this.lecture = lecture;
    this.sideNav.open();
  }

}
