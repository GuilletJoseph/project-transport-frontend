import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateuroneComponent } from './utilisateurone.component';

describe('UtilisateuroneComponent', () => {
  let component: UtilisateuroneComponent;
  let fixture: ComponentFixture<UtilisateuroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateuroneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateuroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
