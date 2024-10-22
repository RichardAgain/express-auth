import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TangramPageComponent } from './tangram-page.component';

describe('TangramPageComponent', () => {
  let component: TangramPageComponent;
  let fixture: ComponentFixture<TangramPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TangramPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TangramPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
