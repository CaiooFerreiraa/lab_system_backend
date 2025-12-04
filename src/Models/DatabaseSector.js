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
      const msgError = error.message.split(" ");
      if (msgError.includes('duplicate') && msgError.includes('key')) throw new Error(`Setor ${nome} já está cadastrado`);
      throw new Error(error.message);
    }
  }

  async search(nome) {
    try {
      const setor = await this.db`
        SELECT nome
        FROM lab_system.setor
        WHERE nome = ${nome}
      `

      return setor;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async searchMateriaisInSetor(nome) {
    try {
      const materiaisInSetor = await this.db`
        SELECT a.nome as Setor, b.tipo as Tipo, b.referencia as "Referência"
        FROM lab_system.setor a
        JOIN lab_system.material b ON a.id = b.cod_setor
        WHERE a.nome = ${nome}
        ORDER BY b.referencia;
      `

      return materiaisInSetor;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async edit(oldName, newName) {
    try {
      await this.db`
        UPDATE lab_system.setor
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
        SELECT nome
        FROM lab_system.setor
      `;

      return setores;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}