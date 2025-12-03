export default class IDatabase {
  constructor(db) {
    this.db = db;
  }
  async register(item) {}
  async search(item) {}
  async edit(item) {}
  async delete(item) {}
  async readAll() {}
}