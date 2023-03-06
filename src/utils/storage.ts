/* eslint-disable @typescript-eslint/no-explicit-any */
import SecureLs from "secure-ls";

export class SecureStorage {
  private ls: SecureLs;

  constructor() {
    this.ls = new SecureLs({
      encodingType: "aes",
      encryptionSecret: import.meta.env.VITE_APP_KEY,
    });
  }

  getItem(key: string) {
    return this.ls.get(key);
  }

  setItem(key: string, value: any) {
    this.ls.set(key, value);
  }

  removeItem(key: string) {
    this.ls.remove(key);
  }

  clearItems() {
    this.ls.removeAll();
  }

  static instance = () => new SecureStorage();
}
