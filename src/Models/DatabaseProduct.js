import IDatabase from "../Interfaces/IDatabase.js";

export default class DatabaseProduct extends IDatabase {
  constructor(db) {
    super(db)
  }

  async register({referencia, tipo, setor}) {
    try {
      const cod_setor = await this.#getSectorForName(setor);
      await this.db`
        INSERT INTO lab_system.material (referencia, tipo, cod_setor)
        VALUES (${referencia}, ${tipo}, ${cod_setor})
      `;
    } catch (error) {
      const msgError = error.message.split(" ");
      if (msgError.includes('duplicate') && msgError.includes('key')) throw new Error(`Código ${referencia} já está cadastrado`);
      throw new Error(error.message)
    }
  }

  async #getSectorForName(setor) {
    try {
      const [{id}] = await this.db`
        SELECT id
        FROM lab_system.setor
        WHERE nome = ${setor};
      `
      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async search(referencia) {
    try {
      const material = await this.db`
        SELECT referencia, tipo
        FROM lab_system.material
        WHERE referencia = ${referencia};
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
        SET referencia = ${newcode}
        WHERE referencia = ${uuid}
      `
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async delete({uuid}) {
    try {
      await this.db`
        DELETE FROM lab_system.material
        WHERE referencia = ${uuid}
      `;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async readAll() {
    try {
      const materiais = await this.db`
        SELECT referencia, tipo
        FROM lab_system.material
      `
      return materiais;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}