import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  // styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  theme = inject(ThemeService)
}
