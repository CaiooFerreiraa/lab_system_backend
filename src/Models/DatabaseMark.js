import dataBase from '../../bd.js'

export default class DatabaseMark {
  async createMark({ name }) {
    try {
      await dataBase`INSERT INTO lab_system.marca(nome) VALUES (${name})`;
    } catch (error) {
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
      await dataBase`UPDATE lab_system.marca SET nome = ${name} WHERE cod_marca = ${cod_marca}`
    } catch (error) {
      throw error;
    }
  }

  async deleteMark({cod_marca}) {
    try {
      await dataBase`DELETE FROM lab_system.marca WHERE cod_marca = ${cod_marca}`;
    } catch (error) {
      throw error;
    }
  }
}