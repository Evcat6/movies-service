import { StorageKey } from '../common/enums/storageKey.enum';

class Storage {
  constructor(private store: globalThis.Storage) {}

  get<T>(key: StorageKey): T {
    const dataFromStorage: T = JSON.parse(this.store.getItem(key) || '[]');
    return dataFromStorage;
  }

  set<T>(key: string, value: T): void {
    this.store.setItem(key, JSON.stringify(value));
  }
}

export { Storage };
