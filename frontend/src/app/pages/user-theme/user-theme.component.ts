import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../shared/services/theme.service';
import { ColorChromeModule } from 'ngx-color/chrome';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LayoutComponent } from '../../shared/components/dahsboard/layout/layout.component';
import { ButtonPrimaryComponent } from '../../shared/components/buttons/button-primary/button-primary.component';
import { ButtonOutlineComponent } from '../../shared/components/buttons/button-outline/button-outline.component';
import { TextComponent } from '../../shared/components/text/text.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { SubTitleComponent } from '../../shared/components/sub-title/sub-title.component';
import { LoadingService } from '../../shared/components/loading/loading.service';

@Component({
  selector: 'app-user-theme',
  standalone: true,
  imports: [
    LayoutComponent,
    CommonModule,
    ColorChromeModule,
    NgxSliderModule,
    ButtonPrimaryComponent,
    ButtonOutlineComponent,
    TextComponent,
    TitleComponent,
    SubTitleComponent,
  ],
  templateUrl: './user-theme.component.html',
  styleUrl: './user-theme.component.scss',
})
export class UserThemeComponent {
  textSize: number = 16;
  subSize: number = 24;
  titleSize: number = 32;
  loading = inject(LoadingService)
  theme = inject(ThemeService);

  fontFile: File | null = null;
  titleFontFile: File | null = null;

  constructor() {
    this.textSize = parseInt(this.theme.textSize().replace('px', ''));
    this.subSize = parseInt(this.theme.subSize().replace('px', ''));
    this.titleSize = parseInt(this.theme.titleSize().replace('px', ''));
  }

  onFontSelected(event: Event, fontFamily: 'customFont' | 'customTitleFont') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (fontFamily ==='customFont') {
        this.fontFile = file;
      }

      if (fontFamily === 'customTitleFont') {
        this.titleFontFile = file;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const font = new FontFace(fontFamily, e.target.result);
        font.load().then((loadedFont) => {
          (document.fonts as any).add(loadedFont);
          document.body.style.fontFamily = fontFamily;
        });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  saveTheme() {
    this.loading.isLoading.set(true)

    let formData = new FormData();

    formData.append('primary', this.theme.primary());
    formData.append('secondary', this.theme.secondary());
    formData.append('accent', this.theme.accent());
    formData.append('background', this.theme.background());
    formData.append('text', this.theme.text());

    formData.append('textSize', this.theme.textSize());
    formData.append('subSize', this.theme.subSize());
    formData.append('titleSize', this.theme.titleSize());

    if (this.fontFile) {
      formData.append('fonts', this.fontFile, 'paragraphs');
    }

    if (this.titleFontFile) {
      formData.append('fonts', this.titleFontFile, 'titles');
    }

    const $upload = this.theme.saveTheme(formData);

    $upload.subscribe((res) => {
      console.log(res, ' saved succesfully!');

      this.theme.saveThemeInStorage(res);
    }).add(() => {
      this.loading.isLoading.set(false)
    })
  }
}
