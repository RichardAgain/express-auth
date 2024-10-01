import { Component, computed, effect, inject, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { ColorChromeModule } from 'ngx-color/chrome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-user-theme',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ColorChromeModule, NgxSliderModule],
  templateUrl: './user-theme.component.html',
  styleUrl: './user-theme.component.scss'
})
export class UserThemeComponent {
  value: number = 16

  theme = inject(ThemeService)

  computed = computed(() => this.theme.primary + ' computed');

  constructor () {
    this.theme.changeTheme()
  }
}
