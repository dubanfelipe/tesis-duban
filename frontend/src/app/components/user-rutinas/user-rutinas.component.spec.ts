import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRutinasComponent } from './user-rutinas.component';

describe('UserRutinasComponent', () => {
  let component: UserRutinasComponent;
  let fixture: ComponentFixture<UserRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRutinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
