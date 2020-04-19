import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductorComponent } from './info-productor.component';

describe('InfoProductorComponent', () => {
  let component: InfoProductorComponent;
  let fixture: ComponentFixture<InfoProductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
