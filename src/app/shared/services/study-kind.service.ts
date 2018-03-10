import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import StudyKind from '../models/studyKind';

var studyKinds: StudyKind[] = [
  {id: "1", name: "Stacjonarne"},
  {id: "2", name: "Niestacjonarne"}
];

@Injectable()
export class StudyKindService {

  constructor() { }

  getAll(): Observable<StudyKind[]> {
    return Observable.of(studyKinds)
  }

}
