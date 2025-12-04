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
        SELECT a.referencia, a.tipo, b.nome as setor
        FROM lab_system.material a
        JOIN lab_system.setor b ON a.cod_setor = b.id
        WHERE a.referencia = ${referencia};
      `
      return material;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async edit({uuid, newcode, newsector, newtipo}) {
    try {
      const cod_setor = await this.#getSectorForName(newsector)

      await this.db`
        UPDATE lab_system.material
        SET referencia = ${newcode}, cod_setor = ${cod_setor}, tipo = ${newtipo}
        WHERE referencia = ${uuid}
      `
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async delete({uuid, setor}) {
    try {
      const cod_setor = await this.#getSectorForName(setor)
      await this.db`
        DELETE FROM lab_system.material
        WHERE referencia = ${uuid} AND cod_setor = ${cod_setor}
      `;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async readAll() {
    try {
      const materiais = await this.db`
        SELECT a.referencia, a.tipo, b.nome as setor
        FROM lab_system.material a
        JOIN lab_system.setor b ON a.cod_setor = b.id;
      `
      return materiais;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async readProducts(nome) {
    try {
      const materiais = await this.db`
        SELECT a.referencia, a.tipo
        FROM lab_system.material a
        JOIN lab_system.setor b ON a.cod_setor = b.id
        WHERE b.nome = ${nome};
      `

      return materiais;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}