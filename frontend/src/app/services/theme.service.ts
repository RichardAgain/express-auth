import { computed, effect, inject, Injectable, OnInit, signal } from '@angular/core';
import { SessionsService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  session = inject(SessionsService);
  storage = inject(StorageService);
  http = inject(HttpClient);

  primary = signal<string>('');
  secondary = signal<string>('');
  accent = signal<string>('');
  background = signal<string>('');
  text = signal<string>('');

  textSize = signal<string>('');
  subSize = signal<string>('');
  titleSize = signal<string>('');

  constructor () {
    this.changeTheme()
    this.changeFont()
  }

  changeTheme() {
    const sessionTheme = this.session.getSession()?.theme || ''

    this.primary.set(sessionTheme.primary || 'black')
    this.secondary.set(sessionTheme.primary || 'black')
    this.accent.set(sessionTheme.primary || 'black')
    this.text.set(sessionTheme.text || 'white')
    this.background.set(sessionTheme.background || 'gray')

    this.textSize.set(sessionTheme.textSize || '16px')
    this.subSize.set(sessionTheme.subSize || '24px')
    this.titleSize.set(sessionTheme.titleSize || '32px')
  }

  changeFont() {
    const font = new FontFace(
      'customFont',
      `url(http://localhost:3000/fonts/${
        this.session.getSession()?.theme.fontPath
      })`
    );

    font.load()
      .then((loadedFont) => {
        (document.fonts as any).add(loadedFont);
        console.log(`Font ${loadedFont.family} loaded successfully`);
      })
      .catch((error) => {
        console.error('Failed to load font:', error);
      });
  }

  saveTheme(formData: any) {
    return this.http.patch('api/user/theme', formData);
  }

  saveThemeInStorage(theme: any) {
    const storage = this.storage.getValue('session')

    console.log(storage)

    this.storage.saveValue('session', JSON.stringify({
      ...storage,
      theme
    }))

    this.changeTheme()
  }
}
