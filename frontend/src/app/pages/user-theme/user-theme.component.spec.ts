import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThemeComponent } from './user-theme.component';

describe('UserThemeComponent', () => {
  let component: UserThemeComponent;
  let fixture: ComponentFixture<UserThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
