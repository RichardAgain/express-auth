import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../shared/services/theme.service';
import { ColorChromeModule } from 'ngx-color/chrome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@Component({
  selector: 'app-user-theme',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ColorChromeModule, NgxSliderModule],
  templateUrl: './user-theme.component.html',
  styleUrl: './user-theme.component.scss',
})
export class UserThemeComponent {
  textSize: number = 16;
  subSize: number = 24;
  titleSize: number = 32;
  theme = inject(ThemeService);
  fontFile: File | null = null;

  constructor() {
    this.textSize = parseInt(this.theme.textSize().replace('px', ''))
    this.subSize = parseInt(this.theme.subSize().replace('px', ''))
    this.titleSize = parseInt(this.theme.titleSize().replace('px', ''))
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fontFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const font = new FontFace('customFont', e.target.result);
        font.load().then((loadedFont) => {
          (document.fonts as any).add(loadedFont);
          document.body.style.fontFamily = 'customFont';
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  saveTheme() {
    let formData = new FormData();

    formData.append('primary', this.theme.primary())
    formData.append('secondary', this.theme.secondary());
    formData.append('accent', this.theme.accent());
    formData.append('background', this.theme.background());
    formData.append('text', this.theme.text());

    formData.append('textSize', this.theme.textSize());
    formData.append('subSize', this.theme.subSize());
    formData.append('titleSize', this.theme.titleSize());

    if (this.fontFile) {
      formData.append('font', this.fontFile, this.fontFile.name);
    }

    const $upload = this.theme.saveTheme(formData);

    $upload.subscribe((res) => {
      console.log(res, ' saved succesfully!')

      this.theme.saveThemeInStorage(res)
    });
  }
}
