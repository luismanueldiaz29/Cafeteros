import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPromotoriaComponent } from './info-promotoria.component';

describe('InfoPromotoriaComponent', () => {
  let component: InfoPromotoriaComponent;
  let fixture: ComponentFixture<InfoPromotoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPromotoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPromotoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
