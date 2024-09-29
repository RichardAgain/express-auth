import { Component, computed, effect, inject, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface Theme {
  primary: string;
  secundary: string;
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  theme = inject(ThemeService)

  computed = computed(() => this.theme.primary + ' computed');

  changeTheme() {
    this.theme.changeTheme()
  }

  resize(size: number) {
    this.theme.resize(size)
  }
}
