import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeListComponent } from './privilege-list.component';

describe('PrivilegeListComponent', () => {
  let component: PrivilegeListComponent;
  let fixture: ComponentFixture<PrivilegeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivilegeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
