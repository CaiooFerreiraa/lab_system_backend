import IDatabase from "../Interfaces/IDatabase.js";

export default class DatabaseModel extends IDatabase {
  constructor(db) {
    super(db);
  }

  async register({ nome, tipo, especificacao_modelo, marca }) {
    try {
      const cod_marca = await this.#getBrandForName(marca);

      await this.db`
        INSERT INTO lab_system.modelo (nome, tipo, especificacao_modelo, cod_marca)
        VALUES (${nome}, ${tipo}, ${especificacao_modelo}, ${cod_marca});
      `;
    } catch (error) {
      const msgError = error.message.split(" ");

      if (msgError.includes("duplicate") && msgError.includes("key")) {
        throw new Error(`O modelo "${nome}" já está cadastrado`);
      }

      throw new Error(error.message);
    }
  }

  async #getBrandForName(marca) {
    try {
      const [{ cod_marca }] = await this.db`
        SELECT cod_marca
        FROM lab_system.marca
        WHERE nome = ${marca};
      `;

      return cod_marca;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async search(id) {
    try {
      const modelo = await this.db`
        SELECT cod_modelo, nome, tipo, especificacao_modelo, cod_marca
        FROM lab_system.modelo
        WHERE cod_modelo = ${id};
      `;

      return modelo;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async edit({ id, newName, newTipo, newEspecificacao, newMarca }) {
    try {
      let cod_marca = null;

      if (newMarca) {
        cod_marca = await this.#getBrandForName(newMarca);
      }

      await this.db`
        UPDATE lab_system.modelo
        SET 
          nome = COALESCE(${newName}, nome),
          tipo = COALESCE(${newTipo}, tipo),
          especificacao_modelo = COALESCE(${newEspecificacao}, especificacao_modelo),
          cod_marca = COALESCE(${cod_marca}, cod_marca)
        WHERE cod_modelo = ${id};
      `;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete({ id }) {
    try {
      await this.db`
        DELETE FROM lab_system.modelo
        WHERE cod_modelo = ${id};
      `;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async readAll() {
    try {
      const modelos = await this.db`
        SELECT cod_modelo, nome, tipo, especificacao_modelo, cod_marca
        FROM lab_system.modelo;
      `;

      return modelos;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
