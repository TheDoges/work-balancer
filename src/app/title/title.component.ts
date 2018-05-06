import { Component, OnInit } from '@angular/core';
import { Title } from '../shared/models/title';
import { Subject, Observable } from 'rxjs';
import { TitleService } from '../shared/services/title.service';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  titles: Title[];
  dataChange: Subject<Title[]> = new Subject<Title[]>();
  dataSource = new TitleDataSource(this.dataChange);
  editedRow: Title;
  lastIndex: number;

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.getAll()
    .subscribe(titles => {
      this.titles = titles;
      this.dataChange.next(titles);
    });
  }

  isEditableRow = (_, row) => {
    return row === this.editedRow;
  }

  addTitle() {
    const row = new Title();
    const lastRow = this.editedRow;
    const lastIndex = this.lastIndex;
    this.lastIndex = 0;
    this.editedRow = row;
    this.titles.unshift(row);
    this.refreshElementPredicate(0, row);
    if (lastRow) {
      this.refreshElementPredicate(lastIndex+1, lastRow)
    }
  }

  editTitle(element, event, index) {
    const lastElement = this.editedRow;
    const lastIndex = this.lastIndex;
    this.editedRow = element;
    this.lastIndex = index;
    this.refreshElementPredicate(index,element);
    if (lastElement) {
      this.titleService.save(lastElement).toPromise();
      this.refreshElementPredicate(lastIndex, lastElement);
    }
    event.stopPropagation();
  }

  saveTitle(element, event, index) {
    this.editedRow = null;
    this.lastIndex = null;
    this.refreshElementPredicate(index,element);
    this.titleService.save(element)
    .subscribe(subject => {});
    event.stopPropagation();
  }

  deleteTitle(titleToRemove: Title) {
    const observable = this.titleService.delete(titleToRemove);
    if (observable) {
      observable.subscribe(() => {
        this.titles = this.titles.filter(title => title.id !== titleToRemove.id);
        this.dataChange.next(this.titles);
      })
    }
  }

  private refreshElementPredicate(index, element) {
    this.titles.splice(index,1);
    this.dataChange.next(this.titles);
    this.titles = this.titles.slice(0, index).concat([element]).concat(this.titles.slice(index));
    this.dataChange.next(this.titles);
  }

}
class TitleDataSource extends DataSource<any> {

  constructor(private dataChange) {
    super();
  }
  connect(): Observable<any> { 
    return this.dataChange;
  }

  disconnect() {}
}
