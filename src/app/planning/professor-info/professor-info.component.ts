import { Component, OnInit, Input } from '@angular/core';
import { Lecturer } from '../../shared/models/lecturer';
import { Link } from '../../shared/models/link';
import { LinkService } from '../../shared/services/link.service';

@Component({
  selector: 'app-professor-info',
  templateUrl: './professor-info.component.html',
  styleUrls: ['./professor-info.component.css']
})
export class ProfessorInfoComponent implements OnInit {
  
  @Input() lecturer: Lecturer;
  
  constructor(private linkService: LinkService) { }
  
  ngOnInit() {
  }
  
  removeLink(index: number, link: Link) {
    const observable = this.linkService.delete(link);
    if (observable) {
      observable.toPromise();
    }
  }
  
}
