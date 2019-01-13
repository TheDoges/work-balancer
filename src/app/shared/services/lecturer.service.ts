import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lecturer, InputLecturer, OutputLecturer } from '../models/lecturer';
import { Semester } from '../models/semester';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { LinkService } from './link.service';
import { Link } from '../models/link';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LecturerService {
  
  constructor(private apiService: ApiService, private linkService: LinkService, private snackBar: MatSnackBar) { }
  
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
    const request = lecturer.id? this.apiService.put(`lecturer/${lecturer.id}`, payload) : this.apiService.post('lecturer', payload);
    return request
    .do(() => {
      this.snackBar.open(`Prowadzący "${lecturer.surname} ${lecturer.name}" został zapisany`, null, {duration: 3000});
    })
  };

  delete(lecturer: Lecturer) {
    if(confirm(`Czy chcesz usunąć prowadzącego "${lecturer.surname} ${lecturer.name}"?`)) {
      return this.apiService.delete(`lecturer/${lecturer.id}`)
      .do(() => {
        this.snackBar.open(`Prowadzący "${lecturer.surname} ${lecturer.name}" został usunięty`, null, {duration: 3000});
      })
    }
  }
  
  
}
