import { Component, inject, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sub-title',
  standalone: true,
  imports: [],
  templateUrl: './sub-title.component.html',
  styleUrl: './sub-title.component.scss'
})
export class SubTitleComponent {
  theme = inject(ThemeService)

  @Input() title = 'Title'
}
