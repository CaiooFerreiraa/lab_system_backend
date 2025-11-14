import IProductRepository from "../Interfaces/IProductRepository.js";

export default class DatabaseProduct extends IProductRepository{
  constructor(db) {
    super(db)
  }

  async register({code, type}) {
    try {
      await this.db`
        INSERT INTO lab_system.material (code, type)
        VALUES (${code}, ${type})
      `

      return 200;
    } catch (error) {
      throw new Error(error)
    }
  }

  searchProduct(product) {}
  editProduct(product) {}
  deleteProduct(product) {}
  readAllProduct() {}
}