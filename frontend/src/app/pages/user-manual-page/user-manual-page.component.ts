import { Component, inject } from '@angular/core';
import { LayoutComponent } from "../../shared/components/dahsboard/layout/layout.component";
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-user-manual-page',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './user-manual-page.component.html',
  styleUrl: './user-manual-page.component.scss'
})
export class UserManualPageComponent {
  _theme = inject(ThemeService)

  src = 'http://localhost:3000/documents/' + this._theme.userManualPath()
}
