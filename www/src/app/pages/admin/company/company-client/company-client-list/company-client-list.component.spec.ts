import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyClientListComponent } from './company-client-list.component';

describe('CompanyClientListComponent', () => {
  let component: CompanyClientListComponent;
  let fixture: ComponentFixture<CompanyClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyClientListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
