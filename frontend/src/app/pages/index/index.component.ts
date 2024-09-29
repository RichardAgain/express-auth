import { Component, computed, effect, inject, signal } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>
import { ColorHueModule } from 'ngx-color/hue'; // <color-hue-picker></color-hue-picker>
import { ColorSketchModule } from 'ngx-color/sketch'; // <color-sketch></color-sketch>
import { ColorSliderModule } from 'ngx-color/slider'; // <color-slider></color-slider>
import { ColorShadeModule } from 'ngx-color/shade'; // <color-shade-picker></color-shade-picker>
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

interface Theme {
  primary: string;
  secundary: string;
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ColorSketchModule, ColorShadeModule, ColorChromeModule, NgxSliderModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  value: number = 16

  theme = inject(ThemeService)

  computed = computed(() => this.theme.primary + ' computed');

  resize(size: any) {
    console.log(size)
    // this.theme.resize(size)
  }
}
