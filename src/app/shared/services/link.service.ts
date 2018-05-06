import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from '../models/link';
import { Semester } from '../models/semester';
import { Subject } from '../models/subject';
import { Lecturer } from '../models/lecturer';

@Injectable()
export class LinkService {
  
  constructor() { }
  
  getAllForSemester(semester: Semester): Observable<Link[]> {
    // Tu będzie request
    return Observable.of([
      new Link().deserialize({
        id: "1", lecturer_id: "1", subject_id: "1", hours: 20
      }),
      new Link().deserialize({
        id: "2", lecturer_id: "2", subject_id: "2", hours: 10
      })
    ]);
  }
  
  add(link: Link, subject: Subject, lecturer: Lecturer): Observable<any> | null {
    // Tu będzie request
    link.subject = subject;
    subject.addLink(link);
    link.lecturer = lecturer;
    lecturer.addLink(link);

    link.id = (Math.random()*10e36).toString() // TODO - Remove when back-end done
    return
  }
  
  update(link: Link, subject: Subject, lecturer: Lecturer): Observable<any> | null {
    // Tu będzie request
    subject.removeLink(link);
    lecturer.removeLink(link);
    link.subject.addLink(link);
    link.lecturer.addLink(link);
    return;
  }
  
  delete(link: Link): Observable<any> | null {
    // Tu będzie request
    link.subject.removeLink(link);
    link.lecturer.removeLink(link);
    return;
  }
  
}
