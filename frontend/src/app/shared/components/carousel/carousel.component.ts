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

  position = 0


  changePosition (value: number) {
    this.position += value

    if (this.position >= this.theme.carouselPaths().length) {
      this.position = 0
    } else if (this.position < 0) {
      this.position = this.theme.carouselPaths().length - 1
    }
  }

  getPath (path: string) {
    return `url('http://localhost:3000/images/carousel/image-2.png')`
  }
}
