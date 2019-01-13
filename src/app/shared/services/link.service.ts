import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link, RawLink } from '../models/link';
import { Semester } from '../models/semester';
import { Subject } from '../models/subject';
import { Lecturer } from '../models/lecturer';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LinkService {
  
  constructor(private apiService: ApiService) { }
  
  getAll(): Observable<Link[]> {
    return this.apiService.get('lecturer-subject')
    .pipe(map(response => response.data))
    .pipe(map((links: RawLink[]) => links.map(link => new Link().deserialize(link))))
  }

  getAllForSemester(semester: Semester): Observable<Link[]> {
    return this.apiService.get(`semester/${semester.id}/lecturer-subject`)
    .pipe(map(response => response.data))
    .pipe(map((links: RawLink[]) => links.map(link => new Link().deserialize(link))))
  }
  
  add(link: Link, subject: Subject, lecturer: Lecturer): Observable<any> | null {
    return this.apiService.post('lecturer-subject', link.serialize())
    .do(() => {
      link.subject = subject;
      subject.addLink(link);
      link.lecturer = lecturer;
      lecturer.addLink(link);
    })
  }
  
  update(link: Link, subject: Subject, lecturer: Lecturer): Observable<any> | null {
    return this.apiService.put(`lecturer-subject/${link.id}`, link.serialize())
    .do(() => {
      subject.removeLink(link);
      lecturer.removeLink(link);
      link.subject.addLink(link);
      link.lecturer.addLink(link);
    })
  }
  
  delete(link: Link): Observable<any> | null {
    return this.apiService.delete(`lecturer-subject/${link.id}`)
    .do(() => {
      link.subject.removeLink(link);
      link.lecturer.removeLink(link);
    })
  }
  
}
