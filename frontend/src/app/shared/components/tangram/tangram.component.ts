import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-tangram',
  standalone: true,
  imports: [],
  templateUrl: './tangram.component.html',
  styleUrl: './tangram.component.scss'
})
export class TangramComponent {
  theme = inject(ThemeService)
}
