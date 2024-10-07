import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SiderbarLinkComponent } from './siderbar-link/siderbar-link.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SiderbarLinkComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
}
