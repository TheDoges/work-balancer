import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Semester, RawSemester } from '../models/semester';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SemesterService {

  private selectionChange: BehaviorSubject<Semester> = new BehaviorSubject(null);
  
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) { }
  
  getAll(): Observable<Semester[]> {
    return this.apiService.get('semester')
    .pipe(map(response => response.data))
    .pipe(map((semesters: RawSemester[]) => semesters.map(semester => new Semester().deserialize(semester))))
  }

  save(semester: Semester) {
    const payload: RawSemester = semester.serialize();
    const request = semester.id? this.apiService.put(`semester/${semester.id}`, payload) : this.apiService.post('semester', payload);
    return request
    .do(() => {
      this.snackBar.open(`Semester "${semester.name} ${semester.year}" został zapisany`, null, {duration: 3000});
    })
  };

  setSelected(semester: Semester) {
    this.selectionChange.next(semester);
  }

  getSelected(): Observable<Semester> {
    return this.selectionChange.asObservable();
  }
  
}
