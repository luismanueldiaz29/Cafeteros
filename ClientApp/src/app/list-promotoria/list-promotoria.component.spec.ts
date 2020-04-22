import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPromotoriaComponent } from './list-promotoria.component';

describe('ListPromotoriaComponent', () => {
  let component: ListPromotoriaComponent;
  let fixture: ComponentFixture<ListPromotoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPromotoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPromotoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
