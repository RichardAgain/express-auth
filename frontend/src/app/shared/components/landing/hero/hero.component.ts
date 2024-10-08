import { Component, inject } from '@angular/core';
import { ButtonPrimaryComponent } from '../../buttons/button-primary/button-primary.component';
import { ButtonOutlineComponent } from '../../buttons/button-outline/button-outline.component';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonPrimaryComponent, ButtonOutlineComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  theme = inject(ThemeService)
}
