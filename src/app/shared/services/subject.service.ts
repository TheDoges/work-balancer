import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map, every } from 'rxjs/operators';
import { Subject, InputSubject, SubjectType, OutputSubject } from '../models/subject';
import {LinkService} from './link.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/operator/merge';
import { Link } from '../models/link';
import { Semester } from '../models/semester';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SubjectService {
  
  constructor(private apiService: ApiService, private linkService: LinkService, public snackBar: MatSnackBar) { }
  
  getAll(): Observable<Subject[]> {
    return this.apiService.get('subject')
    .pipe(map(response => response.data))
    .pipe(map((subjects: InputSubject[]) => subjects.map(subject => new Subject().deserialize(subject))))
  };
  
  getAllForSemester(semester: Semester): Observable<Subject[]> {
    return this.getAll()
    .map(subjects => subjects.filter(subject => subject.semester.id === semester.id));
  };

  getAllWithLinksForSemester(semester: Semester): Observable<Subject[]> {
    return combineLatest(this.getAllForSemester(semester), this.linkService.getAllForSemester(semester), (subjects:Subject[], links:Link[]) => {
      links.forEach(link => {
        const subject = subjects.find(subject => subject.id === link.subject_id);
        if(subject) {
          subject.addLink(link);
          link.subject = subject;
        }
      });
      return subjects;
    });
  };
  
  getSubjectTypes(): Observable<SubjectType[]> {
    const subjectTypes = [
      SubjectType.lab,
      SubjectType.lec,
      SubjectType.pro,
      SubjectType.exe,
      SubjectType.sem
    ];
    return Observable.of(subjectTypes);
  };
  
  save(subject: Subject): Observable<any> {
    const payload: OutputSubject = subject.serialize();
    const request = subject.id? this.apiService.put(`subject/${subject.id}`, payload) : this.apiService.post('subject', payload);
    return request
    .do(() => {
      this.snackBar.open(`Przedmiot "${subject.name}" został zapisany`, null, {duration: 3000});
    })
  };

  delete(subject: Subject) {
    if(confirm(`Czy chcesz usunąć przedmiot "${subject.name}"?`)) {
      return this.apiService.delete(`subject/${subject.id}`)
      .do(() => {
        this.snackBar.open(`Przedmiot "${subject.name}" został usunięty`, null, {duration: 3000});
      })
    }
  }
  
}
