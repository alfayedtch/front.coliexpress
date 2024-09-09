import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeImageComponent } from './qrcode-image.component';

describe('QrcodeImageComponent', () => {
  let component: QrcodeImageComponent;
  let fixture: ComponentFixture<QrcodeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
