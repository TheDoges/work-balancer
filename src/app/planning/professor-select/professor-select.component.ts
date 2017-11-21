import { Component, OnInit, Inject } from '@angular/core';
import { Professor } from '../planning-table/planning-table.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-professor-select',
  templateUrl: './professor-select.component.html',
  styleUrls: ['./professor-select.component.css']
})
export class ProfessorSelectComponent {

  professorCtrl: FormControl;
  filteredProfessors: Observable<any[]>;

  professors: any[] = [
    {name: 'Wow1', hours: 10},
    {name: 'Wow2', hours: 20},
    {name: 'Wow3', hours: 30},
    {name: 'Wow4', hours: 40},
    {name: 'Wow5', hours: 50},
    {name: 'Wow6', hours: 60},
  ];

  constructor( public dialogRef: MatDialogRef<ProfessorSelectComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.professorCtrl = new FormControl();
    this.filteredProfessors = this.professorCtrl.valueChanges
        .startWith(null)
        .map(professor => professor ? this.filterProfessors(professor.name || professor) : this.professors.slice());
  }

  closeDialog(data) {
    this.dialogRef.close(data);
  }

  filterProfessors(name: string) {
    return this.professors.filter(professor =>
      professor.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  }

  formatProfessor(professor) {
    return professor ? professor.name : '';
  }
}
