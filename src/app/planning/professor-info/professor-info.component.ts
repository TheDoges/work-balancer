import { Component, OnInit, Input } from '@angular/core';
import Professor from '../../shared/models/professor';
import Job from '../../shared/models/job';

@Component({
  selector: 'app-professor-info',
  templateUrl: './professor-info.component.html',
  styleUrls: ['./professor-info.component.css']
})
export class ProfessorInfoComponent implements OnInit {

  @Input() professor: Professor;

  constructor() { }

  ngOnInit() {
  }

  removeJob(index: number, job: Job) {
    this.professor.deleteJob(index);
    job.class.deleteJob(job);
  }

}
