import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lecturer } from '../../shared/models/lecturer';

@Component({
  selector: 'app-professor-select',
  templateUrl: './professor-select.component.html',
  styleUrls: ['./professor-select.component.css']
})
export class ProfessorSelectComponent {
  
  professorCtrl: FormControl;
  filteredProfessors: Observable<any[]>;
  
  lecturers: Lecturer[];
  
  constructor( public dialogRef: MatDialogRef<ProfessorSelectComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.lecturers = data.lecturers
    .filter((lecturer: Lecturer) => {
      return lecturer.hasPermission(data.type)
    })
    this.professorCtrl = new FormControl();
    this.filteredProfessors = this.professorCtrl.valueChanges
    .startWith(null)
    .map(lecturer => lecturer ? this.filterProfessors(lecturer.name || lecturer) : this.lecturers.slice());
  }
  
  closeDialog(data) {
    this.dialogRef.close(data);
  }
  
  filterProfessors(query: string) {
    query = query.toLowerCase();
    return this.lecturers.filter(lecturer =>
      lecturer.name.toLowerCase().includes(query) || lecturer.surname.toLowerCase().includes(query));
    }
    
    formatProfessor(lecturer: Lecturer) {
      return lecturer ? lecturer.surname + lecturer.name: '';
    }
  }
  