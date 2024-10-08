import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { SiderbarLinkComponent } from "./sidebar-link/siderbar-link.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SidebarComponent, SiderbarLinkComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  theme = inject(ThemeService)
}
