import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-video-container',
  standalone: true,
  imports: [],
  templateUrl: './video-container.component.html',
  styleUrl: './video-container.component.scss'
})
export class VideoContainerComponent implements OnInit {
  theme = inject(ThemeService)

  ngOnInit(): void {

  }
}
