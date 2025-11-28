import IDatabase from "../Interfaces/IDatabase.js";

export default class DatabaseSector extends IDatabase {
  constructor(db) {
    super(db)
  }

  async register({nome}) {
    try {
      await this.db`
        INSERT INTO lab_system.setor(nome)
        VALUES (${nome})
      `
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async search(nome) {
    try {
      const [setor] = await this.db`
        SELECT *
        FROM lab_system.setor
        WHERE nome = ${nome}
      `
      return setor;
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async edit(oldName, newName) {
    try {
      await this.db`
        UPDATE lab_sysrtem.setor
        SET nome = ${newName}
        WHERE nome = ${oldName}
      `
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async delete(nome) {
    try {
      await this.db`
        DELETE FROM lab_system.setor
        WHERE nome = ${nome};
      `
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async readAll() {
    try {
      const setores = await this.db`
        SELECT *
        FROM lab_system.setor
      `;

      return setores;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}