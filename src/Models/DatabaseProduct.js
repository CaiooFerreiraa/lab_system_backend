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
    } catch (error) {
      const msgError = error.message.split(" ");
      if (msgError.includes('duplicate') && msgError.includes('key')) throw new Error(`Código ${code} já está cadastrado`);
    }
  }

  async search(code) {
    try {
      const material = await this.db`
        SELECT code, type
        FROM lab_system.material
        WHERE code = ${code};
      `
      return material;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async edit({uuid, newcode}) {
    try {
      await this.db`
        UPDATE lab_system.material
        SET code = ${newcode}
        WHERE code = ${uuid}
      `
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async delete({uuid}) {
    try {
      await this.db`
        DELETE FROM lab_system.material
        WHERE code = ${uuid}
      `;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async readAll() {
    try {
      const materiais = await this.db`
        SELECT code, type
        FROM lab_system.material
      `
      return materiais;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}