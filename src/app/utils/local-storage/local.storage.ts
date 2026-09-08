export class LocalStorageUtil {
  static getItem(key: string) {
    if (!key) return { success: false, message: 'key não pode ser vazio' };
    const value = localStorage.getItem(key);
    return value
      ? { success: true, value, message: 'key encontrada' }
      : { success: false, message: 'key não encontrada' };
  }

  static setItem(key: string, value: string) {
    if (!key) return { success: false, message: 'key não pode ser vazio' };
    localStorage.setItem(key, value);
    return { success: true, message: 'item salvo com sucesso' };
  }

  static removeItem(key: string) {
    if (!key) return { success: false, message: 'key não pode ser vazio' };
    localStorage.removeItem(key);
    return { success: true, message: 'item removido com sucesso' };
  }

  static removeAll(): void {
    localStorage.clear();
  }

  static length(): number {
    return localStorage.length;
  }
}
