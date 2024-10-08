import { Component, inject } from '@angular/core';
import { LayoutComponent } from '../../../shared/components/dahsboard/layout/layout.component';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './dashboard.component.html',
  // styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  theme = inject(ThemeService)

  constructor() {
    this.theme.changeTheme()
  }
}
