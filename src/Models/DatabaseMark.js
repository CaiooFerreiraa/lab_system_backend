import dataBase from "../../bd.js";

export default class DatabaseMark {
  async createMark(dataMark) {
    await this.#insertMark(dataMark);
  }

  async #insertMark({ name, ...rest }) {
    try {
      const [result] = await dataBase`
        INSERT INTO lab_system.marca (nome)
        VALUES (${name})
        RETURNING cod_marca, nome
      `;
      const {cod_marca} = result;

      await this.#insertMethodInMark({ cod_marca, ...rest });
    } catch (error) {
      console.error("Erro ao inserir marca:", error);
      throw error;
    }
  }

  async readMark() {
    try {
      return await dataBase`SELECT * FROM lab_system.marca`;
    } catch (error) {
      throw error;
    }
  }

  async updateNameMark({ cod_marca, name }) {
    try {
      await dataBase`
        UPDATE lab_system.marca
        SET nome = ${name}
        WHERE cod_marca = ${cod_marca}
      `;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteMark({ cod_marca }) {
    try {
      await dataBase`
        DELETE FROM lab_system.marca
        WHERE cod_marca = ${cod_marca}
      `;
    } catch (error) {
      throw error;
    }
  }

  async #insertMethodInMark({ cod_marca, methodName, methodDescription }) {
    try {
      await dataBase`
        INSERT INTO lab_system.metodo (nome, descricao, fk_marca_cod_marca)
        VALUES (${methodName}, ${methodDescription}, ${cod_marca})
      `;
    } catch (error) {
      console.error("Erro ao inserir método:", error);
      throw error;
    }
  }

  async readMethod() {
    try {
      return await dataBase`SELECT * FROM lab_system.metodo`;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateMethodMark({ methodName, methodDescription, methodCode }) {
    try {
      await dataBase`
        UPDATE lab_system.marca
        SET nome = ${methodName}, descricao = ${methodDescription}
        WHERE cod_metodo = ${methodCode}
      `;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteMethod({methodCode}) {
    try {
      await dataBase`
        DELETE FROM lab_system.metodo
        WHERE cod_metodo = ${methodCode}
      `
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
