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
  }

  changeTheme() {
    const sessionTheme = this.session.getSession()?.theme || ''

    this.primary.set(sessionTheme.primary || '#2563eb')
    this.secondary.set(sessionTheme.secondary || '#1f2937')
    this.accent.set(sessionTheme.accent || '#42566a')
    this.text.set(sessionTheme.text || 'black')
    this.background.set(sessionTheme.background || 'white')

    this.textSize.set(sessionTheme.textSize || '16px')
    this.subSize.set(sessionTheme.subSize || '30px')
    this.titleSize.set(sessionTheme.titleSize || '48px')

    this.changeFont()
  }

  changeFont() {
    if (!this.session.getSession()?.theme.fontPath) return

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

  toDeafults() {
    const storage = this.storage.getValue('session')

    console.log('yeah')

    this.storage.saveValue('session', JSON.stringify({
      ...storage,
      theme: {
        primary: '#2563eb',
        secondary: '#1f2937',
        accent: '#42566a',
        background: 'white',
        text: 'black',
        textSize: '16px',
        subSize: '30px',
        titleSize: '48px',
      }
    }))

    this.changeTheme()
  }

  saveThemeInStorage(theme: any) {
    const storage = this.storage.getValue('session')

    console.log(theme)

    this.storage.saveValue('session', JSON.stringify({
      ...storage,
      theme
    }))

    this.changeTheme()
  }
}
