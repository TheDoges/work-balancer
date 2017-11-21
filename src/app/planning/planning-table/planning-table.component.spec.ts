import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { planningTableComponent } from './planning-table.component.spec.ts';

describe('planningTableComponent', () => {
  let component: planningTableComponent;
  let fixture: ComponentFixture<planningTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ planningTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(planningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
