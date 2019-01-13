import { Injectable } from '@angular/core';
import { Title, RawTitle } from '../models/title';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class TitleService {
  
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) { }
  
  getAll(): Observable<Title[]> {
    return this.apiService.get('title')
    .pipe(map(response => response.data))
    .pipe(map((titles: RawTitle[]) => titles.map(title => new Title().deserialize(title))))
  };

  save(title: Title) {
    const payload: RawTitle = title.serialize();
    const request = title.id? this.apiService.put(`title/${title.id}`, payload) : this.apiService.post('title', payload);
    return request
    .do(() => {
      this.snackBar.open(`Tytuł "${title.name}" został zapisany`, null, {duration: 3000});
    })
  };

  delete(title: Title) {
    if(confirm(`Czy chcesz usunąć tytuł "${title.name}"?`)) {
      return this.apiService.delete(`title/${title.id}`)
      .do(() => {
        this.snackBar.open(`Tytuł "${title.name}" został usunięty`, null, {duration: 3000});
      })
    }
  }
  
}
