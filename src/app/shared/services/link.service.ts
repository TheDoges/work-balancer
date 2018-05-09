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
    // Tu będzie request
    // return Observable.of([
    //   new Link().deserialize({
    //     id: "1", lecturer_id: "1", subject_id: "1", hours: 20
    //   }),
    //   new Link().deserialize({
    //     id: "2", lecturer_id: "2", subject_id: "2", hours: 10
    //   })
    // ]);
    return this.getAll();
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
