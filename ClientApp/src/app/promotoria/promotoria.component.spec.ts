import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotoriaComponent } from './promotoria.component';

describe('PromotoriaComponent', () => {
  let component: PromotoriaComponent;
  let fixture: ComponentFixture<PromotoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
