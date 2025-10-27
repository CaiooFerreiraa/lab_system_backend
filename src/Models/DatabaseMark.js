import dataBase from "../../bd.js";
import IMarkRepository from "../Interfaces/IMarkRepository.js";

export default class DatabaseMark extends IMarkRepository {
  async createMark(dataMark) {
    await this.#insertMark(dataMark);
  }

  async #insertMark({ marca, metodos }) {
    try {
      const [{cod_marca}] = await dataBase`
        INSERT INTO lab_system.marca (nome)
        VALUES (${marca})
        RETURNING cod_marca 
      `;
      await metodos.forEach(metodo => {
        this.#insertMethodInMark(cod_marca, metodo);
      })
    } catch (error) {
      console.error("Erro ao inserir marca:", error);
      throw error;
    }
  }

  async #insertMethodInMark(cod_marca, metodo) {
    try {
      await dataBase`
        INSERT INTO lab_system.metodo (nome, descricao, fk_marca_cod_marca)
        VALUES (${metodo.name}, ${metodo.description}, ${cod_marca})
      `;
    } catch (error) {
      console.error("Erro ao inserir método:", error);
      throw error;
    }
  }

  async readMark() {
    try {
      const marks = await dataBase`
        SELECT a.nome as Marca, b.nome as Metodo, b.descricao as Descrição, b.cod_metodo
        FROM lab_system.marca a
        LEFT JOIN lab_system.metodo b ON a.cod_marca = b.fk_marca_cod_marca
      `
      return marks;
    } catch (error) {
      throw error;
    }
  }

  async readMethod() {
    try {
      const methods = await dataBase`
        SELECT nome, descricao 
        FROM lab_system.metodo
      `;

      return methods
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async viewMarkForName(nome) {
    try {
      const marks = await dataBase`
        SELECT a.nome as marca, b.nome as metodo, b.descricao as descrição, b.cod_metodo
        FROM lab_system.marca a
        LEFT JOIN lab_system.metodo b ON a.cod_marca = b.fk_marca_cod_marca
        WHERE a.nome = ${nome};
      `
      return marks;
    } catch (error) {
      throw error;
    }
  }

  async updateMark({marca, metodo = []}) {
    try {
      const cod_marca = await this.#getCodMarca(marca)
      metodo.forEach(metodo => {
        this.#updateMethodInMark(cod_marca, metodo)
      })
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async #getCodMarca(marca) {
    try {
      const [{cod_marca}] = await dataBase`
        SELECT cod_marca
        FROM lab_system.marca
        WHERE nome = ${marca} 
      `
      return cod_marca;
    } catch (error) {
      throw error;
    }
  }

  async #updateMethodInMark(cod_marca, metodo) {
    try {
      if (metodo.cod_metodo == null) {
        await this.#insertMethodInMark(cod_marca, {name: metodo.nome, description: metodo.descricao})
      } else {
        await dataBase`
          UPDATE lab_system.metodo
          SET nome = ${metodo.nome}, descricao = ${metodo.descricao}
          WHERE fk_marca_cod_marca = ${cod_marca} and cod_metodo = ${metodo.cod_metodo};
        `;
      }
    } catch (error) {
      console.error("Erro ao inserir método:", error);
      throw error;
    }
  }

  async deleteMark(nome) {
    try {
      await dataBase`
        DELETE FROM lab_system.marca
        WHERE nome = ${nome}
      `;
    } catch (error) {
      throw error;
    }
  }
  
  async deleteMethod(cod_metodo) {
    try {
      await dataBase`
        DELETE FROM lab_system.metodo
        WHERE cod_metodo = ${cod_metodo}
      `
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
