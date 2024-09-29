import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  storage = inject(StorageService)

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
  }))

  constructor() {
    
  }

  saveTheme() {
    this.storage.saveValue('theme', JSON.stringify(this.options()))
  }
}
