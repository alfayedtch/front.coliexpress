import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeCreateComponent } from './privilege-create.component';

describe('PrivilegeCreateComponent', () => {
  let component: PrivilegeCreateComponent;
  let fixture: ComponentFixture<PrivilegeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivilegeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
