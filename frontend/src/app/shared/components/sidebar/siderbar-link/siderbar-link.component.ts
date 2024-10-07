import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-siderbar-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './siderbar-link.component.html',
  styleUrl: './siderbar-link.component.scss'
})
export class SiderbarLinkComponent {
  activated = inject(ActivatedRoute)

  @Input() label = 'Dashboard'
  @Input() route = ''

  isMatch = false

  ngOnInit () {
    this.isMatch = ('/' + this.activated.snapshot.url.join('/')) === this.route
  }
}
