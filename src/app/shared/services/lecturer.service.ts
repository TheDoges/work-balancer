import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lecturer, InputLecturer, OutputLecturer } from '../models/lecturer';
import { Semester } from '../models/semester';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { LinkService } from './link.service';
import { Link } from '../models/link';

@Injectable()
export class LecturerService {
  
  constructor(private apiService: ApiService, private linkService: LinkService) { }
  
  getAll(): Observable<Lecturer[]> {
    return this.apiService.get('lecturer')
    .pipe(map(response => response.data))
    .pipe(map((lecturers: InputLecturer[]) => lecturers.map(lecturer => new Lecturer().deserialize(lecturer))))
  };
  
  getAllForSemester(semester: Semester): Observable<Lecturer[]> {
    return combineLatest(this.getAll(), this.linkService.getAllForSemester(semester), (lecturers:Lecturer[], links:Link[]) => {
      links.forEach(link => {
        const lecturer = lecturers.find(lecturer => lecturer.id === link.lecturer_id);
        if(lecturer) {
          lecturer.addLink(link);
          link.lecturer = lecturer;
        }
      });
      return lecturers;
    });
  }
  
  save(lecturer: Lecturer) {
    const payload: OutputLecturer = lecturer.serialize();
    return lecturer.id? this.apiService.put(`lecturer/${lecturer.id}`, payload) : this.apiService.post('lecturer', payload);
  };
  
  
}
