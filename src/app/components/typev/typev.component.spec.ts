import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypevComponent } from './typev.component';

describe('TypevComponent', () => {
  let component: TypevComponent;
  let fixture: ComponentFixture<TypevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
