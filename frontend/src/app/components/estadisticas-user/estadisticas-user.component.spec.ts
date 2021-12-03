import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasUserComponent } from './estadisticas-user.component';

describe('EstadisticasUserComponent', () => {
  let component: EstadisticasUserComponent;
  let fixture: ComponentFixture<EstadisticasUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
