import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  getValue(key: string) {
    const value = this.storage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  }

  saveValue(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  removeValue(key: string) {
    this.storage.removeItem(key);
  }
}
