import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoContainerComponent } from './video-container.component';

describe('VideoContainerComponent', () => {
  let component: VideoContainerComponent;
  let fixture: ComponentFixture<VideoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
