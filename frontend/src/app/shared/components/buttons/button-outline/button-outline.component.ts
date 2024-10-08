import { Component, ElementRef, inject, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-button-outline',
  standalone: true,
  imports: [],
  templateUrl: './button-outline.component.html',
  styleUrl: './button-outline.component.scss'
})
export class ButtonOutlineComponent {
  theme = inject(ThemeService)

  @Input() label = 'Button'
}
