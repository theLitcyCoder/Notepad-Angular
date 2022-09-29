import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotefooterComponent } from './notefooter.component';

describe('NotefooterComponent', () => {
  let component: NotefooterComponent;
  let fixture: ComponentFixture<NotefooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotefooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotefooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
