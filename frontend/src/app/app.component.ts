import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/services/theme.service';
import { LoadingComponent } from "./shared/components/loading/loading.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LoadingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  theme = inject(ThemeService)
}
