import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import StudyForm from '../models/studyForm';

var studyForms: StudyForm[] = [
  {id: "1", name: "Pierwszego stopnia"},
  {id: "2", name: "Drugiego stopnia"},
  {id: "3", name: "Trzeciego stopnia"}
];

@Injectable()
export class StudyFormService {

  constructor() { }

  getAll(): Observable<StudyForm[]> {
    return Observable.of(studyForms)
  }

}
