import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptionsSelectComponent } from './captions-select.component';

describe('CaptionsSelectComponent', () => {
  let component: CaptionsSelectComponent;
  let fixture: ComponentFixture<CaptionsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptionsSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptionsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
