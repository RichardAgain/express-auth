import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManualPageComponent } from './user-manual-page.component';

describe('UserManualPageComponent', () => {
  let component: UserManualPageComponent;
  let fixture: ComponentFixture<UserManualPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManualPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManualPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
