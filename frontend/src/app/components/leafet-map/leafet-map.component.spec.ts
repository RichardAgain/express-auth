import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafetMapComponent } from './leafet-map.component';

describe('LeafetMapComponent', () => {
  let component: LeafetMapComponent;
  let fixture: ComponentFixture<LeafetMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafetMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeafetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
