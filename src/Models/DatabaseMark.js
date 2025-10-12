import dataBase from '../../bd.js'

const identifierDatabase = 'lab_system.'

export default class DatabaseMark {
  async createMark({ name }) {
    try {
      await dataBase`INSERT INTO ${identifierDatabase}marca(nome) VALUES (${name})`;
    } catch (error) {
      throw error;
    }
  }

  async readMark() {
    try {
      return await dataBase`SELECT * FROM ${identifierDatabase}marca`;
    } catch (error) {
      throw error;
    }
  }

  async updateNameMark({ cod_marca, name }) {
    try {
      await dataBase`UPDATE ${identifierDatabase}marca SET nome = ${name} WHERE cod_marca = ${cod_marca}`
    } catch (error) {
      throw error;
    }
  }

  async deleteMark({cod_marca}) {
    try {
      await dataBase`DELETE FROM ${identifierDatabase}marca WHERE cod_marca = ${cod_marca}`;
    } catch (error) {
      throw error;
    }
  }
}