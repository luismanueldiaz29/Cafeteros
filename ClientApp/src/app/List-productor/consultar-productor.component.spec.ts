import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProductorComponent } from './consultar-productor.component';

describe('ConsultarProductorComponent', () => {
  let component: ConsultarProductorComponent;
  let fixture: ComponentFixture<ConsultarProductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarProductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
