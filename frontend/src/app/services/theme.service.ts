import { computed, effect, inject, Injectable, signal } from '@angular/core';
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

  primary = signal<string>('red');
  secondary = signal<string>('red');
  accent = signal<string>('red');

  text = signal<string>('black');
  background = signal<string>('white');

  textSize = signal<string>('16px');

  options = computed(() => ({
    primary: this.primary(),
    secondary: this.secondary(),
    accent: this.accent(),
    text: this.text(),
    background: this.background(),
    textSize: this.textSize(),
  }));

  constructor() {
    effect(
      () => {
        console.log(this.session.getSession(), 'changed!!!');

        this.changeTheme();
      },
      { allowSignalWrites: true }
    );
  }

  changeTheme() {
    const sessionTheme = this.session.getSession()?.theme || '';

    console.log('session theme: ', sessionTheme);

    this.primary.set(sessionTheme.primary || 'red');
    this.text.set(sessionTheme.text || 'black');
    this.background.set(sessionTheme.background || 'white');
  }

  saveTheme() {
    this.http.put('api/user/theme', this.options()).subscribe((res) => {
      console.log(res, 'YESSSS');
      this.storage.saveValue(
        'session',
        JSON.stringify({
          access_token: this.session.getSession()?.access_token,
          theme: this.options(),
        })
      );
    });
  }
}
