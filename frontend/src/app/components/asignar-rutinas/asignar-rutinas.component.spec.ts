import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRutinasComponent } from './asignar-rutinas.component';

describe('AsignarRutinasComponent', () => {
  let component: AsignarRutinasComponent;
  let fixture: ComponentFixture<AsignarRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarRutinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
