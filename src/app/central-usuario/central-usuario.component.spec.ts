import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralUsuarioComponent } from './central-usuario.component';

describe('CentralUsuarioComponent', () => {
  let component: CentralUsuarioComponent;
  let fixture: ComponentFixture<CentralUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
