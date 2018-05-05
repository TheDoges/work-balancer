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

@Injectable()
export class SubjectService {
  
  constructor(private apiService: ApiService, private linkService: LinkService) { }
  
  getAll(): Observable<Subject[]> {
    return this.apiService.get('subject')
    .pipe(map(response => response.data))
    .pipe(map((subjects: InputSubject[]) => subjects.map(subject => new Subject().deserialize(subject))))
  };
  
  getAllForSemester(semester: Semester): Observable<Subject[]> {
    return combineLatest(this.getAll(), this.linkService.getAllForSemester(semester), (subjects:Subject[], links:Link[]) => {
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
      SubjectType.lec
    ];
    return Observable.of(subjectTypes);
  };
  
  save(subject: Subject): Observable<Subject> {
    const payload: OutputSubject = subject.serialize();
    return subject.id? this.apiService.put(`subject/${subject.id}`, payload) : this.apiService.post('subject', payload);
  };
  
}
