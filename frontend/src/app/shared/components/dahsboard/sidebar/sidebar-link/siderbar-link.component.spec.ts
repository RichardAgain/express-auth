import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarLinkComponent } from './siderbar-link.component';

describe('SiderbarLinkComponent', () => {
  let component: SiderbarLinkComponent;
  let fixture: ComponentFixture<SiderbarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiderbarLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiderbarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
