import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Professor from '../../shared/models/professor';

@Component({
  selector: 'app-professor-select',
  templateUrl: './professor-select.component.html',
  styleUrls: ['./professor-select.component.css']
})
export class ProfessorSelectComponent {

  professorCtrl: FormControl;
  filteredProfessors: Observable<any[]>;

  professors: Professor[];

  constructor( public dialogRef: MatDialogRef<ProfessorSelectComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.professors = data.professors;
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

  formatProfessor(professor: Professor) {
    return professor ? professor.name : '';
  }
}
