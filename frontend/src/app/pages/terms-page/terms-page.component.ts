import { Component, inject } from '@angular/core';
import { LayoutComponent } from "../../shared/components/dahsboard/layout/layout.component";
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './terms-page.component.html',
  styleUrl: './terms-page.component.scss'
})
export class TermsPageComponent {
  _theme = inject(ThemeService)
}
