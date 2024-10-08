import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-siderbar-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './siderbar-link.component.html',
  styleUrl: './siderbar-link.component.scss'
})
export class SiderbarLinkComponent {
  activated = inject(ActivatedRoute)
  theme = inject(ThemeService)

  @Input() label = 'Dashboard'
  @Input() route = ''

  isMatch = false

  ngOnInit () {
    this.isMatch = ('/' + this.activated.snapshot.url.join('/')) === this.route
  }
}
