import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAuditoriaComponent } from './info-auditoria.component';

describe('InfoAuditoriaComponent', () => {
  let component: InfoAuditoriaComponent;
  let fixture: ComponentFixture<InfoAuditoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAuditoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
