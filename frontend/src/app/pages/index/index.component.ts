import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../shared/services/theme.service';
import { LayoutComponent } from '../../shared/components/landing/layout/layout.component';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

interface Theme {
  primary: string;
  secundary: string;
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LayoutComponent, CommonModule, LoadingComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  theme = inject(ThemeService)

  constructor () {
    this.theme.changeTheme()
  }
}
