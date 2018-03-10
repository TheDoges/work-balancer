import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Study from '../models/study';

var studies: Study[] = [
  {id: "1", name: "Informatyka"},
  {id: "2", name: "Automatyka i Robotyka"}
];

@Injectable()
export class StudyService {

  constructor() { }

  getAll(): Observable<Study[]> {
    return Observable.of(studies)
  }

}
